import { ChatOpenAI } from "@langchain/openai";
import type { ChatPromptTemplate } from "@langchain/core/prompts";

import { pull } from "langchain/hub";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import PriceTool from "./tools/price.tool";
import path from 'path';
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../.env') });

const openAIKey = process.env.OPENAI_API_KEY;

(async () => {
  const tools = [new PriceTool()];
  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0,
    openAIApiKey: openAIKey,
  });
  const prompt = await pull<ChatPromptTemplate>(
    "hwchase17/openai-functions-agent"
  );
  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });
  // const result = await agentExecutor.invoke({
  //   input: "eth price",
  // })
  // console.log("🚀 ~ result:", result)


  // STREAM: https://js.langchain.com/docs/modules/agents/how_to/streaming
  const eventStream = await agentExecutor.streamEvents({
    input: "eth price",
  }, { version: "v1" });

  for await (const event of eventStream) {
    const eventType = event.event;
    if (eventType === "on_chain_start") {
      // Was assigned when creating the agent with `.withConfig({"runName": "Agent"})` above
      if (event.name === "Agent") {
        console.log("\n-----");
        console.log(
          `Starting agent: ${event.name} with input: ${JSON.stringify(
            event.data.input
          )}`
        );
      }
    } else if (eventType === "on_chain_end") {
      // Was assigned when creating the agent with `.withConfig({"runName": "Agent"})` above
      if (event.name === "Agent") {
        console.log("\n-----");
        console.log(`Finished agent: ${event.name}\n`);
        console.log(`Agent output was: ${event.data.output}`);
        console.log("\n-----");
      }
    } else if (eventType === "on_llm_stream") {
      const content = event.data?.chunk?.message?.content;
      // Empty content in the context of OpenAI means
      // that the model is asking for a tool to be invoked via function call.
      // So we only print non-empty content
      if (content !== undefined && content !== "") {
        console.log(`| ${content}`);
      }
    } else if (eventType === "on_tool_start") {
      console.log("\n-----");
      console.log(
        `Starting tool: ${event.name} with inputs: ${event.data.input}`
      );
    } else if (eventType === "on_tool_end") {
      console.log("\n-----");
      console.log(`Finished tool: ${event.name}\n`);
      console.log(`Tool output was: ${event.data.output}`);
      console.log("\n-----");
    }
  }
})()