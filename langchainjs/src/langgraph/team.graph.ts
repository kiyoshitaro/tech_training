import { END, START, StateGraph } from "@langchain/langgraph";
import {
  AnswerNode,
  SupervisorNode,
  TokenNode,
  TopHolderNode,
  WalletNode,
} from "./nodes";
import { GetTopHolderTool } from "./tools";
import GetBalanceTool from "./tools/get-balance.tool";
import GetPriceTool from "./tools/get-price.tool";
import { baseStateChannels, BaseStateChannels } from "./state/base.state";
import { RunnableConfig } from "@langchain/core/runnables";
import { HumanMessage } from "langchain/schema";
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });
const openAIApiKey = process.env.OPENAI_API_KEY;

type ToolData = {
  contractAddress: string;
  walletAddress?: string;
};

export const ENameFunctionTypeAgent = {
  SUPERVISOR: "supervisor",
  TOKEN: "token",
  WALLET: "wallet",
  ANSWER_4O: "answer_4o",
  ANSWER_4O_MINI: "answer_4o_mini",
  TOP_HOLDER: "topHolder",
};

export const members = [
  {
    name: ENameFunctionTypeAgent.TOKEN,
    description:
      "Get the price of the token or get token information by token address",
  },
  {
    name: ENameFunctionTypeAgent.WALLET,
    description: "Get balance",
  },
  {
    name: ENameFunctionTypeAgent.TOP_HOLDER,
    description: "Useful get top 10 holder.",
  },
];

function initializeTools(
  onEvent: (name: string, data: any) => void,
  toolData: ToolData
) {
  return {
    getBalance: new GetBalanceTool().clone(
      { walletAddress: toolData?.walletAddress },
      onEvent
    ),

    topHolderTool: new GetTopHolderTool().clone(
      { walletAddress: toolData?.walletAddress },
      onEvent
    ),
  };
}

async function createGraph(
  onCallback: (message: string, ended: boolean) => void,
  onEvent: (name: string, data: any) => void,
  toolData?: ToolData
) {
  const chatModels = {
    "gpt-4o": new ChatOpenAI({
      openAIApiKey,
      modelName: "gpt-4o",
      temperature: 0.7,
    }),
    "gpt-4o-mini": new ChatOpenAI({
      openAIApiKey,
      modelName: "gpt-4o-mini",
      temperature: 0.7,
    }),
  };
  try {
    const supervisorNode = new SupervisorNode(chatModels["gpt-4o-mini"], {
      contractAddress: toolData?.contractAddress,
    });
    await supervisorNode.initialize({ members });

    const answer4oNode = new AnswerNode(chatModels["gpt-4o"]);
    await answer4oNode.initialize();

    const answer4miniNode = new AnswerNode(chatModels["gpt-4o-mini"]);
    await answer4miniNode.initialize();

    const tools = initializeTools(onEvent, toolData);
    const walletNode = new WalletNode(chatModels["gpt-4o-mini"]);
    await walletNode.initialize({
      tools: [tools.getBalance, new GetPriceTool()],
    });

    const tokenNode = new TokenNode(chatModels["gpt-4o"]);
    await tokenNode.initialize({
      tools: [new GetPriceTool()],
    });
    const topHolderNode = new TopHolderNode(chatModels["gpt-4o-mini"]);
    await topHolderNode.initialize({
      tools: [tools.topHolderTool],
      name: ENameFunctionTypeAgent.TOP_HOLDER,
    });
    const workflow = new StateGraph<BaseStateChannels>({
      channels: baseStateChannels,
    })
      .addNode(
        ENameFunctionTypeAgent.SUPERVISOR,
        (state, config: RunnableConfig) =>
          supervisorNode.createNode(state, config, onCallback)
      )

      // TODO: Add node 4o
      .addNode(
        ENameFunctionTypeAgent.ANSWER_4O,
        (state, config: RunnableConfig) =>
          answer4oNode.createNode(state, config, onCallback)
      )
      .addEdge(ENameFunctionTypeAgent.ANSWER_4O, END)

      // TODO: Add node 4o mini
      .addNode(
        ENameFunctionTypeAgent.ANSWER_4O_MINI,
        (state, config: RunnableConfig) =>
          answer4miniNode.createNode(state, config, onCallback)
      )
      .addEdge(ENameFunctionTypeAgent.ANSWER_4O_MINI, END)

      // TODO: Add token
      .addNode(ENameFunctionTypeAgent.TOKEN, tokenNode.createNode)
      .addEdge(ENameFunctionTypeAgent.TOKEN, ENameFunctionTypeAgent.ANSWER_4O)

      // TODO: Add wallet
      .addNode(ENameFunctionTypeAgent.WALLET, walletNode.createNode)
      .addEdge(
        ENameFunctionTypeAgent.WALLET,
        ENameFunctionTypeAgent.ANSWER_4O_MINI
      )
      // TODO: Add node get top holder
      .addNode(ENameFunctionTypeAgent.TOP_HOLDER, topHolderNode.createNode)
      .addEdge(
        ENameFunctionTypeAgent.TOP_HOLDER,
        ENameFunctionTypeAgent.ANSWER_4O_MINI
      );
    workflow.addConditionalEdges(
      ENameFunctionTypeAgent.SUPERVISOR,
      (x) => {
        return x.next;
      },
      {
        __end__: END,
        [ENameFunctionTypeAgent.TOKEN]: ENameFunctionTypeAgent.TOKEN,
        [ENameFunctionTypeAgent.WALLET]: ENameFunctionTypeAgent.WALLET,
        [ENameFunctionTypeAgent.TOP_HOLDER]: ENameFunctionTypeAgent.TOP_HOLDER,
      }
    );
    workflow.addEdge(START, ENameFunctionTypeAgent.SUPERVISOR);
    return workflow.compile();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

(async () => {
  const onStream = (message: string) => {
    console.log({
      type: "text",
      text: message,
    });
  };
  let metadata;
  let parsedMetadata;
  let subMetadata;
  const useTools = [];
  const onEvent = (name: string, data: any) => {
    console.log("On event:", name);
    if (!!data?.functionType) {
      useTools.push(data?.functionType);
    }

    if (data?.metadata) {
      if (!subMetadata) {
        metadata = data?.metadata;
        parsedMetadata = JSON.parse(metadata);
        subMetadata = parsedMetadata;
      } else {
        parsedMetadata = JSON.parse(metadata);
        metadata = JSON.stringify({
          ...parsedMetadata,
          subMetadata: subMetadata,
        });
      }
    }
    console.log(data);
  };

  const graph = await createGraph(onStream, onEvent, {
    contractAddress: "GTH3wG3NErjwcf7VGCoXEXkgXSHvYhx5gtATeeM5JAS1",
    walletAddress: "Av9ZubuZKCqEanoZhxyWASfFYudV2Tp3CzrQi1YHDsJ9",
  });

  // NOTE: INVOKE
  const streamInvoke = await graph.invoke(
    {
      history_chat: [
        new HumanMessage({
          content: "Get balance of my wallet",
          // "Get top holder of this token: GTH3wG3NErjwcf7VGCoXEXkgXSHvYhx5gtATeeM5JAS1",
        }),
      ],
    },
    { recursionLimit: 5 }
  );
  const listContent = streamInvoke.messages.map((message) => {
    if (message.content !== "") {
      return message.content;
    }
  });
  const content = listContent[0];
  console.log("🚀 ~ MultiAgentService ~ content:", content);
})();
