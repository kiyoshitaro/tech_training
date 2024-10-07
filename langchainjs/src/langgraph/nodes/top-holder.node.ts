import { ChatOpenAI } from "@langchain/openai";
import { BaseNode } from "./base.node";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { BaseStateChannels } from "../state/base.state";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { StructuredTool } from "@langchain/core/tools";
import { END } from "@langchain/langgraph";
import { TopHolderAgent } from "../agents/top-holder.agent";
import { ENameFunctionTypeAgent } from "../team.graph";

export class TopHolderNode extends BaseNode {
  llm: ChatOpenAI;
  chain: Runnable;
  name = ENameFunctionTypeAgent.TOP_HOLDER;

  constructor(llm: ChatOpenAI) {
    super();
    this.llm = llm;
  }

  initialize = async (options: { tools: StructuredTool[]; name?: string }) => {
    const systemPrompt = `
      Useful get 10 top holder.
      Convert base on to markdown.
      `;
    const agent = new TopHolderAgent(
      options.name || this.name,
      systemPrompt,
      this.llm,
      options.tools
    );
    this.chain = await agent.createAgent();
    return this.chain;
  };

  createNode = async (state: BaseStateChannels, config?: RunnableConfig) => {
    console.log(`[RUN] [${this.name} -> createNode]`);
    state.messages.push(new HumanMessage({ content: state.request }));
    const result = await this.chain.invoke(
      {
        ...state,
      },
      config
    );
    const output = result.output;
    // const result = await this.chain.stream(
    //   {
    //     ...state,
    //   },
    //   config,
    // );
    // let output;
    // for await (const chunk of result) {

    //   if (chunk?.output) {
    //     output = chunk?.output;
    //   }
    // }
    state.messages.pop();
    return {
      next: END,
      messages: [new AIMessage({ content: output })],
    };
  };
}
