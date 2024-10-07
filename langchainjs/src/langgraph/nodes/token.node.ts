import { ChatOpenAI } from "@langchain/openai";
import { BaseNode } from "./base.node";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { BaseStateChannels } from "../state/base.state";
import { TokenAgent } from "../agents/token.agent";
import { HumanMessage } from "@langchain/core/messages";
import { StructuredTool } from "@langchain/core/tools";
import { ENameFunctionTypeAgent } from "../team.graph";

export class TokenNode extends BaseNode {
  llm: ChatOpenAI;
  chain: Runnable;
  name = ENameFunctionTypeAgent.TOKEN;

  constructor(llm: ChatOpenAI) {
    super();
    this.llm = llm;
  }

  initialize = async (options: { tools: StructuredTool[]; name?: string }) => {
    const systemPrompt =
      "You are a token assistant. You can get the price of the token and get token information by token address";

    const agent = new TokenAgent(
      options.name || this.name,
      systemPrompt,
      this.llm,
      options.tools
    );
    this.chain = await agent.createAgent();
    return this.chain;
  };

  createNode = async (state: BaseStateChannels, config?: RunnableConfig) => {
    state.messages.push(new HumanMessage({ content: state.request }));
    const result = await this.chain.invoke(state, config);
    state.messages.pop();
    return {
      messages: [
        new HumanMessage({
          content: "Token response: " + result.output,
          name: "token",
        }),
      ],
    };
  };
}
