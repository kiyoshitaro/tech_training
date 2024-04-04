import { OpenAIAssistantRunnable } from 'langchain/experimental/openai_assistant';
import { StructuredTool } from 'langchain/tools';
import { AgentExecutor } from 'langchain/agents';
import OpenAI from 'openai';
import PriceTool from './tools/price.tool';
import path from 'path';
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../.env') });

const openAIKey = process.env.OPENAI_API_KEY;


const createAssistant = async (
  name: string,
  instructions: string,
  tools: StructuredTool[],
): Promise<string> => {
  const agent = await OpenAIAssistantRunnable.createAssistant({
    clientOptions: {
      apiKey: openAIKey,
    },
    model: 'gpt-3.5-turbo-1106',
    instructions: instructions,
    name: name,
    tools,
    asAgent: true,
  });
  return agent.assistantId;
}

const createThreadGPT = async () => {
  const openai = new OpenAI({
    apiKey: openAIKey,
  });
  const { id } = await openai.beta.threads.create();
  return id;
}

(async () => {
  const content = "Hello";
  const assistantId = await createAssistant('TEST', '', [new PriceTool()]);
  console.log('assistantId', assistantId); // console by M-MON
  const threadId = await createThreadGPT()

  const agent = new OpenAIAssistantRunnable({
    clientOptions: {
      apiKey: openAIKey,
    },
    assistantId,
    asAgent: true,
  });


  const execution = AgentExecutor.fromAgentAndTools({
    agent,
    tools: [new PriceTool()],
    verbose: true,
    returnIntermediateSteps: true,
    maxIterations: 5,
  });
  const result = await execution.invoke({ content, threadId, modelName: 'gpt-3.5-turbo-1106' });
  console.log("🚀 ~ result:", result)

})()