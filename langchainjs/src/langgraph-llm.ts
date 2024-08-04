import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import { END, MessageGraph, START } from "@langchain/langgraph";
import { BaseMessageLike } from "langchain/schema";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });
const openAIKey = process.env.OPENAI_API_KEY;

(async () => {
  const model = new ChatOpenAI({ temperature: 0, openAIApiKey: openAIKey });

  const graph = new MessageGraph();

  graph
    .addNode("oracle", (state: BaseMessage[]) => {
      return model.invoke(state);
    })
    .addEdge(START, "oracle")
    .addEdge("oracle", END);

  const runnable = graph.compile();

  // For Message graph, input should always be a message or list of messages.
  const res = await runnable.invoke(new HumanMessage("What is 1 + 1?"));
})();
