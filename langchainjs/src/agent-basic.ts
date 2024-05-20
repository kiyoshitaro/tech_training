import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

import { pull } from "langchain/hub";
import { AgentExecutor, createOpenAIFunctionsAgent, createOpenAIToolsAgent } from "langchain/agents";
import PriceTool from "./tools/price.tool";
import path from 'path';
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../.env') });

const openAIKey = process.env.OPENAI_API_KEY;

(async () => {
  const tools = [new PriceTool()];
  const llm = new ChatOpenAI({
    //     configuration: {
    //   baseURL: 'http://localhost:1234/v1'
    // },
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0,
    openAIApiKey: openAIKey,
  });
  // const prompt = await pull<ChatPromptTemplate>(
  //   "hwchase17/openai-functions-agent"
  // );

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant"],
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
  ]);

  const agent = await createOpenAIToolsAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });
  const result = await agentExecutor.invoke({
    input: "eth price",
  })
  console.log("🚀 ~ result:", result)
  // const input = `
  // \n History Chat: ${JSON.stringify([{
  //   role: 'user',
  //   content: "hi! my name is cob.",
  // },{
  //   role: 'assistant',
  //   content: "Hello Cob! How can I assist you today?",
  // }])} 
  // \n Question: ${'What is my name?'} 
  // \n Format answer: Markdown ( Should not return json data )
  // `;
  // const result1 = await agentExecutor.invoke({
  //     input,
  //     // chat_history: [
  //     //   new HumanMessage("hi! my name is cob."),
  //     //   new AIMessage("Hello Cob! How can I assist you today?"),
  //     // ],  
  //   });
  // console.log("🚀 ~ result1:", result1)
})()