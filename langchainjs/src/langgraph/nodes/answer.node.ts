import { ChatOpenAI } from '@langchain/openai';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { BaseNode } from './base.node';
import { Runnable, RunnableConfig } from '@langchain/core/runnables';
import { BaseStateChannels } from '../state/base.state';
import { END } from '@langchain/langgraph';
import { AIMessage } from '@langchain/core/messages';

export class AnswerNode extends BaseNode {
  llm: ChatOpenAI;
  chain: Runnable;

  constructor(llm: ChatOpenAI) {
    super();
    this.llm = llm;
  }

  initialize = async () => {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', `Current time: {currentTime}`],
      new MessagesPlaceholder('history_chat'),
      new MessagesPlaceholder('messages'),
      [
        'system',
        `
        # Answer the question based on the output results returned by the tool and agent. If the tool requires anything, ask the user to provide it so it can be relaunched.
        # Format Answer:
          + Highlight important information.
          + Use bullet points.
          + Bold the text.
          + Answer user questions in a focused manner.
        # Up to 200 words.
        `,
      ],
    ]);

    this.chain = promptTemplate.pipe(this.llm);
    return this.chain;
  };

  createNode = async (
    state: BaseStateChannels,
    config?: RunnableConfig,
    onCallback?: (message: string, ended: boolean) => void,
  ) => {
    const currentTime = Date.now();
    const next = state.next;
    if (next === END) {
      if (typeof state.messages?.[0]?.content === 'string') {
        for (const chunk of state.messages?.[0]?.content) {
          if (chunk) {
            onCallback(`${chunk}`, false);
          }
        }
      }

      return {
        next: END,
        messages: [new AIMessage({ content: state.response })],
      };
    }
    const result = await this.chain.stream({ ...state, currentTime }, config);

    let message;
    for await (const chunk of result) {
      if (chunk.content && chunk.tool_calls.length <= 0) {
        onCallback(chunk.content, false);
      }
      if (!message) {
        message = chunk;
      } else {
        message = message.concat(chunk);
      }
    }

    onCallback('\n', true);

    return {
      next: END,
      messages: [new AIMessage({ content: message.content })],
    };
  };
}
