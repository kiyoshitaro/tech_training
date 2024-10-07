import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { StructuredTool } from '@langchain/core/tools';
import { Runnable } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createOpenAIToolsAgent } from 'langchain/agents';

/**
 * Create an agent that can run a set of tools.
 */
export async function createMemberAgent({
  name,
  llm,
  tools,
  systemMessage,
  systemPromptResponse,
}: {
  name: string;
  llm: ChatOpenAI;
  tools: StructuredTool[];
  systemMessage: string;
  systemPromptResponse?: string;
}): Promise<Runnable> {
  const toolNames = tools.map((tool) => tool.name).join(', ');
  //If you or any of the other assistants have the final answer or deliverable, prefix your response with "FINAL ANSWER" so the supervisor knows to stop.
  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `
      ${systemMessage}
      ${systemPromptResponse}
      `,
    ],
    new MessagesPlaceholder('messages'),
    new MessagesPlaceholder('agent_scratchpad'),
  ]);

  const agent = await createOpenAIToolsAgent({ llm, tools, prompt });
  return new AgentExecutor({ agent, tools });
}

export const splitDataAndQuestion = (input: string) => {
  console.log(input);
  // Regular expressions to match the data and the question
  const dataPattern = /\*?\*?DATA\*?\*?:\s*\n?([\s\S]*?)\n?REQUEST/;
  const questionPattern = /\*?\*?REQUEST\*?\*?:\s*(.*)/;

  // Extract DATA
  const dataMatch = input.match(dataPattern);
  const data = dataMatch ? dataMatch[1].trim() : '';

  // Extract QUESTION
  const questionMatch = input.match(questionPattern);
  const question = questionMatch ? questionMatch[1].trim() : '';

  return { data, question };
};
