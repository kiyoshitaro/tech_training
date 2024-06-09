import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from 'path';
import { Milvus } from "langchain/vectorstores/milvus";
import { OpenAIEmbeddings } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { BaseMessage } from "langchain/schema";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";


import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, '../.env') });
const openAIKey = process.env.OPENAI_API_KEY;
const REPO_PATH = path.join(__dirname, '../../../project-server');

import { CallbackHandler } from "langfuse-langchain";
const langfuseHandler = new CallbackHandler({
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  baseUrl: "http://localhost:3000",
});

const loadData =async () => {
  const loader = new DirectoryLoader(REPO_PATH, {
    ".ts": (path) => new TextLoader(path),
  });
  const docs = await loader.load();
  const javascriptSplitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 2000,
    chunkOverlap: 200,
  });
  const texts = await javascriptSplitter.splitDocuments(docs);
  console.log("Loaded ", texts.length, " documents.", texts[0]);
  await Milvus.fromDocuments(
    texts.filter((doc) => doc?.pageContent),     
    new OpenAIEmbeddings({
      openAIApiKey: openAIKey,
    }), 
    {
      clientConfig: {
        address: "localhost:19530",
        database: "code_understanding",
      },
    collectionName: "codes",
  });
}
(async () => {
  // await loadData();
  const vectorStore = new Milvus(    
    new OpenAIEmbeddings(  { openAIApiKey: openAIKey }), 
{
    clientConfig: {
      address: "localhost:19530",
      database: "code_understanding",
    },
    collectionName: "codes",
  })
  const retriever = vectorStore.asRetriever({
    // searchType: "mmr", // Use max marginal relevance search
    searchType: "similarity",
    // searchKwargs: { fetchK: 10 },
  });

  const model = new ChatOpenAI({ openAIApiKey: openAIKey }).pipe(new StringOutputParser());

  const combineDocumentsPrompt = ChatPromptTemplate.fromMessages([
    AIMessagePromptTemplate.fromTemplate(
      "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\n"
    ),
    HumanMessagePromptTemplate.fromTemplate("Question: {question}"),
  ]);
    
  const questionGeneratorTemplate = ChatPromptTemplate.fromMessages([
    AIMessagePromptTemplate.fromTemplate(
      "Given the following conversation about a codebase and a follow up question, rephrase the follow up question to be a standalone question."
    ),
    AIMessagePromptTemplate.fromTemplate(`Follow Up Input: {question}
  Standalone question:`),
  ]);
    
  const combineDocumentsChain = RunnableSequence.from([
    {
      question: (output: string) => output,
      context: async (output: string) => {
        const relevantDocs = await retriever.getRelevantDocuments(output);
        return formatDocumentsAsString(relevantDocs);
      },
    },
    combineDocumentsPrompt,
    model,
    new StringOutputParser(),
  ]);
  
  const conversationalQaChain = RunnableSequence.from([
    {
      question: (i: { question: string }) => i.question,
    },
    questionGeneratorTemplate,
    model,
    new StringOutputParser(),
    combineDocumentsChain,
  ]);
    
  // const question = "Introduce all technologies used in this project?";
  const question = "Give me code to create redis adapter in socket";
  const result = await conversationalQaChain.invoke({
    question,
  }, { callbacks: [langfuseHandler] });
  console.log("🚀 ~ result:", result)
  
  
})();

