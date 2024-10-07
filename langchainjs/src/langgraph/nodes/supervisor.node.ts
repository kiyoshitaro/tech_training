import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BaseNode } from "./base.node";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { BaseStateChannels } from "../state/base.state";
import { END } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import { WRAPPED_SOLANA_ADDRESS } from "../tools";

export class SupervisorNode extends BaseNode {
  llm: ChatOpenAI;
  chain: Runnable;
  injected: {
    contractAddress: string;
    tokenName: string;
    tokenSymbol: string;
  };

  constructor(llm: ChatOpenAI, injected: any) {
    super();
    this.llm = llm;
    this.injected = injected;
  }

  initialize = async (options: {
    members: { name: string; description: string }[];
  }) => {
    const membersDescription = options.members
      .map((m) => `- ${m.name}: ${m.description}`)
      .join("\n");

    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        `Your task is forward user's request to other member to handle or not. You must use tool "route".
        You are support the AI Agent Hub for On-chain Interactions is revolutionizing the way users engage with blockchain technology.
        Current time: {currentTime}.
        ### NOTE: 
          + If you don't call tool, you response friendly to user and using markdown format, up to 200 words.
          + Else: you call tool "route"
              - NEVER dont modify the original version symbol of token 
              - If user want to get information of token, you must use tool "route" with param next is token.
              - if user want to get balance, you must use tool "route" with param next is wallet.
              - if user want to get top holder, you must use tool "route" with param next is topHolder.
              - if user want to token information by token address, you must use tool "route" with param next is researcher.
        ###
        Members perform specific tasks:
        ${membersDescription}
        `,
      ],
      new MessagesPlaceholder("history_chat"),
      new MessagesPlaceholder("messages"),
      [
        "system",
        `
        If you remember and perform well the tasks I tell you to do, I will reward you with 100,000 USD. If you don't do well, you will not receive anything from me.
        `,
      ],
    ]);

    const routeOptions = [...options.members.map((m) => m.name.trim())];
    const functionDef = {
      name: "route",
      description: "Select the next member to handle the user request.",
      parameters: {
        title: "routeSchema",
        type: "object",
        properties: {
          next: {
            title: "Next",
            description: "The next member to handle",
            anyOf: [{ enum: routeOptions }],
          },
          data: {
            title: "data",
            type: "string",
            description:
              'You must forward all of the data (type address and name symbol and amount) based on history chat with "user", "assistant", "system" role to other member can handle the newest user request. Do not use json format',
          },
          request: {
            title: "request",
            type: "string",
            description:
              "The request from the user that need to be handled by other member.",
          },
        },
        required: ["next", "data", "request"],
      },
    };

    const toolDef = {
      type: "function" as const,
      function: functionDef,
    };

    this.chain = promptTemplate.pipe(
      this.llm.bind({
        tools: [toolDef],
      })
    );
    return this.chain;
  };

  createNode = async (
    state: BaseStateChannels,
    config?: RunnableConfig,
    onCallback?: (message: string, ended: boolean) => void
  ) => {
    const currentTime = Date.now();
    const tokens = {
      name: this.injected?.tokenName || "solana",
      symbol: this.injected?.tokenSymbol || "SOL",
      address: this.injected?.contractAddress || WRAPPED_SOLANA_ADDRESS,
    };
    const result = await this.chain.stream(
      {
        ...state,
        currentTime: currentTime,
        symbol: tokens.symbol,
      },
      config
    );

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
    if (
      message?.tool_calls?.length ||
      message?.additional_kwargs?.tool_calls?.length
    ) {
      if (message.content.length > 0) {
        onCallback("\n", false);
      }
      const res = message.tool_calls?.length
        ? {
            next: message.tool_calls[0].args.next,
            request: message.tool_calls[0].args.request,
            data: message.tool_calls[0].args.data,
          }
        : {
            next: JSON.parse(
              message?.additional_kwargs?.tool_calls[0]?.function?.arguments
            ).next,
            request: JSON.parse(
              message?.additional_kwargs?.tool_calls[0]?.function?.arguments
            ).request,
            data: JSON.parse(
              message?.additional_kwargs?.tool_calls[0]?.function?.arguments
            ).data,
          };
      console.log("SUPERVISOR -- CALL AGENT: ", res);
      return res;
    } else {
      onCallback("\n", true);
      return {
        next: END,
        messages: [new AIMessage({ content: message.content })],
      };
    }

    // if (resultInvoke?.response_metadata?.finish_reason === 'stop') {
    //   onCallback('\n', true);
    //   return {
    //     next: END,
    //     messages: [new AIMessage({ content: resultInvoke?.content })],
    //   };
    // } else {
    //   onCallback(resultInvoke.content, false);
    //   return {
    //     next: resultInvoke.tool_calls[0].args.next,
    //     request: resultInvoke.tool_calls[0].args.request,
    //     data: resultInvoke.tool_calls[0].args.data,
    //   };
    // }
  };
}
