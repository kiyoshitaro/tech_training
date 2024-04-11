import { ChatOpenAI } from '@langchain/openai';
import path from 'path';
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, '../.env') });

const openAIKey = process.env.OPENAI_API_KEY;

(async () => {
  const question = 'hello';
  const prompt = `
  \n Question: ${question} 
  \n Format answer: Markdown (Should not return json data )
  `;

  const model = new ChatOpenAI({
    // configuration: {
    //   baseURL: 'http://localhost:1234'
    // },
    openAIApiKey: openAIKey,
    modelName: 'gpt-4-1106-preview',
  });
  const stream = await model.stream('Bạn có kiến thức về tử vi. Tôi sinh giờ Bính Tuất 17h30 ngày 31/08/1998, lá số tử vi của tôi có các cách cung nào đặc biệt');
  const chunks: any[] = [];
  for await (const chunk of stream) {
    console.log("🚀 ~ forawait ~ chunk:", chunk.content)
    chunks.push(chunk);
  }
  let finalChunk: any = chunks[0];
  for (const chunk of chunks.slice(1, chunks.length - 1)) {
    finalChunk = finalChunk.concat(chunk);
  }
  console.log('=========> ASSISTANT:', finalChunk.content);

})()