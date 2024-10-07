import { BaseMessage } from "@langchain/core/messages";
import { StateGraphArgs } from "@langchain/langgraph";

export interface BaseStateChannels {
  history_chat: BaseMessage[];
  messages: BaseMessage[];
  // The agent node that last performed work
  next: string;
  response?: string;
  request?: string;
  data?: string;
  // token?: string;
}

// This defines the object that is passed between each node
// in the graph. We will create different nodes for each agent and tool
export const baseStateChannels: StateGraphArgs<BaseStateChannels>["channels"] =
  {
    history_chat: {
      value: (x?: BaseMessage[], y?: BaseMessage[]) => {
        console.log("====> history_chat added ", y);
        return (x ?? []).concat(y ?? []);
      },
      default: () => [],
    },
    messages: {
      value: (x?: BaseMessage[], y?: BaseMessage[]) => {
        console.log("====> messages added ", y);
        return (x ?? []).concat(y ?? []);
      },
      default: () => [],
    },
    next: {
      value: (x?: string, y?: string) => y ?? x ?? "",
      default: () => "",
    },
    response: {
      value: (x?: string, y?: string) => {
        console.log("====> new response ", y);
        return y ?? x ?? "";
      },
      default: () => "",
    },
    request: {
      value: (x?: string, y?: string) => {
        console.log("====> new request ", y);
        return y ?? x ?? "";
      },
      default: () => "",
    },
    data: {
      value: (x?: string, y?: string) => {
        console.log("====> new data ", y);
        return y ?? x ?? "";
      },
      default: () => "",
    },
  };
