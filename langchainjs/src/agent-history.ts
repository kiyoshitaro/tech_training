
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";

import { createRetrieverTool } from "langchain/tools/retriever";

import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { createOpenAIFunctionsAgent } from "langchain/agents";

import { AgentExecutor } from "langchain/agents";

import { HumanMessage, AIMessage } from "@langchain/core/messages";

import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

import { DynamicTool } from "@langchain/core/tools";

import path from 'path';
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../.env') });

const openAIKey = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey: openAIKey,
});


(async () => {
  const loader = new CheerioWebBaseLoader(
    "https://docs.smith.langchain.com/user_guide"
  );
  const rawDocs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const docs = await splitter.splitDocuments(rawDocs);
  console.log("🚀 ~ docs:", docs)

  const vectorstore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: openAIKey })
  );
  const retriever = vectorstore.asRetriever();

  const retrieverTool = createRetrieverTool(retriever, {
    name: "langsmith_search",
    description:
      "Search for information about LangSmith. For any questions about LangSmith, you must use this tool!",
  });

  // Get the prompt to use - you can modify this!
  // If you want to see the prompt in full, you can at:
  // https://smith.langchain.com/hub/hwchase17/openai-functions-agent
  const prompt = await pull<ChatPromptTemplate>(
    "hwchase17/openai-functions-agent"
  );

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools: [retrieverTool],
    prompt,
  });
  const agentExecutor = new AgentExecutor({
    agent,
    tools: [retrieverTool],
  });

  const result = await agentExecutor.invoke({
    input: "how can langsmith help with testing?",
  })
  console.log("🚀 ~ result:", result)
  // const result1 = await agentExecutor.invoke({
  //   input: "hi!",
  //   chat_history: [
  //     new HumanMessage("hi! my name is cob."),
  //     new AIMessage("Hello Cob! How can I assist you today?"),
  //   ],
  // });

  // console.log(result1);



  //   const messageHistory = new ChatMessageHistory();
  //   const agentWithChatHistory = new RunnableWithMessageHistory({
  //     runnable: agentExecutor,
  //     // This is needed because in most real world scenarios, a session id is needed per user.
  //     // It isn't really used here because we are using a simple in memory ChatMessageHistory.
  //     getMessageHistory: (_sessionId) => messageHistory,
  //     inputMessagesKey: "input",
  //     historyMessagesKey: "chat_history",
  //   }); 

  //   const result5 = await agentWithChatHistory.invoke(
  //     {
  //       input: "hi! i'm cob",
  //     },
  //     {
  //       // This is needed because in most real world scenarios, a session id is needed per user.
  //       // It isn't really used here because we are using a simple in memory ChatMessageHistory.
  //       configurable: {
  //         sessionId: "foo",
  //       },
  //     }
  //   );
  //   console.log(result5);
  // /*
  //   {
  //     input: "hi! i'm cob",
  //     chat_history: [
  //       HumanMessage {
  //         content: "hi! i'm cob",
  //         additional_kwargs: {}
  //       },
  //       AIMessage {
  //         content: 'Hello Cob! How can I assist you today?',
  //         additional_kwargs: {}
  //       }
  //     ],
  //     output: 'Hello Cob! How can I assist you today?'
  //   }
  // */

  //   // CUSTOM TOOLS


  //   const customTool = new DynamicTool({
  //     name: "get_word_length",
  //     description: "Returns the length of a word.",
  //     func: async (input: string) => input.length.toString(),
  //   });

  //   /** Define your list of tools. */
  //   const tools = [customTool];

})()