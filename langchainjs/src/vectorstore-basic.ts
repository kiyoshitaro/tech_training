import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import path from 'path';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatOpenAI } from '@langchain/openai';

import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, '../.env') });
const openAIKey = process.env.OPENAI_API_KEY;
(async () => {
  const loader = new PDFLoader(path.join(__dirname, '../assets/58_TU_VI_THUC_HANH.pdf'), {
    splitPages: false,
  });
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 400,
  });

  // const splitDocs = await textSplitter.splitText(state_of_the_union);
  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log("🚀 ~ splitDocs:", splitDocs.length)

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings({
      openAIApiKey: openAIKey
      // configuration: {
      //   baseURL: 'http://localhost:1234/v1'
      // }
    })
  );
  // Search for the most similar document
  // const resultOne = await vectorStore.similaritySearch("CÁCH AN THÂN", 1);
  // console.log(resultOne);

  const question = 'Mệnh gặp được Thiên Cơ Miếu, Vượng thì sao';

  const ds = await vectorStore.similaritySearch(question, 5);
  console.log("🚀 ~ ds:", ds)
  const instruction = {
    role: 'system',
    content: "Tôi là bot giúp trả lời các câu hỏi về tử vi"
  }
  const prompt = `
  \n Hướng dẫn: ${JSON.stringify(instruction)} \\n
  \n Bối cảnh: ${JSON.stringify(ds)} 
  \n Câu hỏi: ${question} 
  `;
  const model = new ChatOpenAI({
    configuration: {
      baseURL: 'http://localhost:1234/v1'
    },
    // openAIApiKey: openAIKey,
    // modelName: 'gpt-4-1106-preview',
  });
  const stream = await model.stream(prompt);
  const chunks: any[] = [];
  for await (const chunk of stream) {
    console.log("🚀 ~ forawait ~ chunk:", chunk.content)
    chunks.push(chunk);
  }
  let finalChunk: any = chunks[0];
  for (const chunk of chunks.slice(1, chunks.length - 1)) {
    finalChunk = finalChunk.concat(chunk);
  }
  console.log('=========> ASSISTANT:', finalChunk.content);

})()