import { Runnable } from '@langchain/core/runnables';

export abstract class BaseAgent {
  abstract createAgent(): Promise<Runnable>;
}
