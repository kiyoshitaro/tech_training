import { Runnable, RunnableConfig } from '@langchain/core/runnables';
import { BaseStateChannels } from '../state/base.state';
import { StructuredTool } from '@langchain/core/tools';
export interface IOption {
  tools: StructuredTool[];
  name?: string;
}
export abstract class BaseNode {
  data: any;
  // injected: any;
  // llm: any;
  //
  // constructor(llm: any, data: any, injected: any) {
  //   this.llm = llm;
  //   this.data = data;
  //   this.injected = injected;
  // }

  abstract initialize(options?: any): Promise<Runnable>;

  abstract createNode(
    state: BaseStateChannels,
    config?: RunnableConfig,
    onCallback?: (message: string) => void,
  ): Promise<any>;
}
