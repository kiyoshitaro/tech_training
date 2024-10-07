import { ChatOpenAI } from '@langchain/openai';
import { StructuredTool } from '@langchain/core/tools';
import { createMemberAgent } from '../utils';
import { BaseAgent } from './base.agent';

export class WalletAgent extends BaseAgent {
  llm: ChatOpenAI;
  systemPrompt: string;
  systemPromptResponse: string;
  name: string;
  tools: StructuredTool[];

  constructor(
    name: string,
    systemPrompt: string,
    systemPromptResponse: string,
    llm: ChatOpenAI,
    tools: StructuredTool[] = [],
  ) {
    super();
    this.systemPrompt = systemPrompt;
    this.systemPromptResponse = systemPromptResponse;
    this.llm = llm;
    this.tools = tools;
    this.name = name;
  }

  createAgent() {
    return createMemberAgent({
      name: this.name,
      llm: this.llm,
      tools: this.tools,
      // systemPromptResponse: this.systemPromptResponse,
      systemMessage: this.systemPrompt,
    });
  }
}
