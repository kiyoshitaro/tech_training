import { ChatOpenAI } from '@langchain/openai';
import { StructuredTool } from '@langchain/core/tools';
import { createMemberAgent } from '../utils';
import { Runnable } from '@langchain/core/runnables';
import { BaseAgent } from './base.agent';

export class TokenAgent extends BaseAgent {
  llm: ChatOpenAI;
  systemPrompt: string;
  tools: StructuredTool[];
  name: string;
  agent: Runnable;

  constructor(
    name: string,
    systemPrompt: string,
    llm: ChatOpenAI,
    tools: StructuredTool[] = [],
  ) {
    super();
    this.systemPrompt = systemPrompt;
    this.llm = llm;
    this.tools = tools;
    this.name = name;
  }

  async createAgent() {
    this.agent = await createMemberAgent({
      name: this.name,
      llm: this.llm,
      tools: this.tools,
      systemMessage: this.systemPrompt,
    });
    return this.agent;
  }
}
