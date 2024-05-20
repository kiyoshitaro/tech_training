import * as dotenv from "dotenv";
import path from 'path';
import OpenAI from 'openai';
import PriceTool from "./tools/price.tool";

dotenv.config({ path: path.join(__dirname, '../.env') });

const openAIKey = process.env.OPENAI_API_KEY;

(async () => {
  const openAI =  new OpenAI({
    apiKey: openAIKey,
  });
  const { id: gpt_thread_id } = await openAI.beta.threads.create();
  const question = '';
  const message = await openAI.beta.threads.messages.create(
    gpt_thread_id,
    {
      role: 'user',
      content: question,
    },
  );
  const tool_called: any = {};
  global.resultData = '';
  // NOTE: Tool must be inject from openai platform interface
  const run = openAI.beta.threads.runs
  .stream(gpt_thread_id, {
    assistant_id: 'asst_lNoJ51GfR1N7xjEiZseA7ABF',
  })
  .on('textDelta', async (delta, snapshot) => {
    //SEND TEXT STREAM
    global.resultData += delta.value;
    console.log("🚀 ~ .on ~ delta.value:", delta.value)
  })
  .on('toolCallCreated', (toolCall: any) => {
    // Tool call is first invoked
    tool_called[toolCall.id] = toolCall.function;
  })
  .on('toolCallDelta', (toolCallDelta, snapshot) => {
    if (toolCallDelta.type === 'function') {
      // Assemble the tool arguments
      tool_called[snapshot.id].arguments +=
        toolCallDelta.function.arguments;
    }
  })
  .on('event', async (event: any) => {
    // NOTE:  detect stream end when no jump to tool
    if (
      event?.data?.status === 'completed' &&
      event?.data?.object === 'thread.message'
    ) {
      // STOP HERE
      console.log(
        '🚀 ~ AiService ~ .on ~ event?.data?.content?.[0].text?.value:',
        event?.data?.content?.[0].text?.value,
      );
    }
    if (event?.data?.status === 'requires_action') {
      const tools = [];
      let result: any;
      const run_id = event?.data?.id;
      const callId = Object.keys(tool_called)[0];
      const outputValue = JSON.parse(tool_called[callId].arguments);
      console.log('🚀 ~ AiService ~ .on ~ outputValue:', outputValue);
      const nameFunction =
        event.data.required_action.submit_tool_outputs.tool_calls[0]
          .function.name;
      try {
        if (nameFunction === 'get_price') {
          result = await new PriceTool()._call(outputValue);
        }    
      } catch (e) {
        result = `I don't understand your question`;
      }
        try {
          const tool_outputs = {
            tool_call_id: callId,
            output: result,
          };
          tools.push(tool_outputs);
          const stream =
            await openAI.beta.threads.runs.submitToolOutputsStream(
              gpt_thread_id,
              run_id,
              {
                tool_outputs: tools,
              },
            );
          for await (const event of stream) {
            if (event.event === 'thread.message.delta') {
              const textValue = (event.data.delta.content[0] as any)?.text
                .value;
              // Stream text response to the client
              console.log("🚀 ~ forawait ~ textValue:", textValue);
              global.resultData += textValue;
            }
          }
          // STOP HERE
        } catch (error) {
          console.log("🚀 ~ .on ~ error:", error)
        }
        // const cancelRunTool = await openAI.beta.threads.runs.cancel(
        //   gpt_thread_id,
        //   run_id,
        // );
    }
  });
})()