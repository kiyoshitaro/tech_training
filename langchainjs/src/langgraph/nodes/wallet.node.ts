import { ChatOpenAI } from '@langchain/openai';
import { BaseNode } from './base.node';
import { Runnable, RunnableConfig } from '@langchain/core/runnables';
import { BaseStateChannels } from '../state/base.state';
import { HumanMessage } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';
import { WalletAgent } from '../agents/wallet.agent';
import { ENameFunctionTypeAgent } from '../team.graph';
export class WalletNode extends BaseNode {
  llm: ChatOpenAI;
  chain: Runnable;
  name = ENameFunctionTypeAgent.WALLET;

  constructor(llm: ChatOpenAI) {
    super();
    this.llm = llm;
  }

  initialize = async (options: { tools: StructuredTool[]; name?: string }) => {
    const systemPrompt =
      'You are a blockchain wallet assistant. You can get balance of the wallet address or get price of the token. You must response all balance in wallet.';
    const systemPromptResponse = `Don't show wallet address.`;

    const agent = new WalletAgent(
      options.name || this.name,
      systemPrompt,
      systemPromptResponse,
      this.llm,
      options.tools,
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
          content: 'Wallet response: ' + result.output,
          name: 'wallet',
        }),
      ],
    };
  };
}
