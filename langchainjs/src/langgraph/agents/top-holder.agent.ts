import { ChatOpenAI } from '@langchain/openai';
import { StructuredTool } from '@langchain/core/tools';
import { createMemberAgent } from '../utils';
import { BaseAgent } from './base.agent';

export class TopHolderAgent extends BaseAgent {
  llm: ChatOpenAI;
  systemPrompt: string;
  name: string;
  tools: StructuredTool[];

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

  createAgent() {
    return createMemberAgent({
      name: this.name,
      llm: this.llm,
      tools: this.tools,
      systemMessage: this.systemPrompt,
    });
  }
}
