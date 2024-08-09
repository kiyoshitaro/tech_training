import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import {
  END,
  MessageGraph,
  START,
  StateGraph,
  StateGraphArgs,
} from "@langchain/langgraph";
import { BaseMessageLike } from "langchain/schema";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });
const openAIKey = process.env.OPENAI_API_KEY;
const model = new ChatOpenAI({ temperature: 0, openAIApiKey: openAIKey });

const runRawGraph = async () => {
  interface IState {
    messages: BaseMessage[];
  }
  const graphState: StateGraphArgs<IState>["channels"] = {
    messages: {
      value: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
      default: () => [],
    },
  };
  const graphS = new StateGraph<IState>({
    channels: graphState,
  });
  graphS
    .addNode("oracle", async (state: IState) => {
      const responseMessage = await model.invoke(state.messages);
      return { messages: [responseMessage] };
    })
    .addEdge(START, "oracle")
    .addEdge("oracle", END);
  const runnableS = graphS.compile();
  const resS = await runnableS.invoke({
    messages: new HumanMessage("What is 1 + 1?"),
  });
  console.log("🚀 ~ res:", resS);
};

(async () => {
  // const graph = new MessageGraph();
  // graph
  //   .addNode("oracle", async (state: BaseMessage[]): => {
  //     const responseMessage = await model.invoke(state);
  //     return {messages: [responseMessage]};
  //   })
  //   .addEdge(START, "oracle")
  //   .addEdge("oracle", END);
  // const runnable = graph.compile();
  // const res = await runnable.invoke({
  //   messages: new HumanMessage("What is 1 + 1?"),
  // });
  await runRawGraph();
})();
