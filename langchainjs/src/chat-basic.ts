import { ChatOpenAI } from '@langchain/openai';
import path from 'path';
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, '../.env') });
import fs from 'fs'

const openAIKey = process.env.OPENAI_API_KEY;

(async () => {
  const question = 'hello';
  const prompt = `
  \n Question: ${question} 
  \n Format answer: Markdown (Should not return json data )
  `;

  const model = new ChatOpenAI({
    // configuration: {
    //   baseURL: 'http://localhost:1234/v1'
    // },
    openAIApiKey: openAIKey,
    modelName: 'gpt-4-1106-preview',
  });
  let laso = fs.readFileSync(path.join(__dirname, '../assets/me.json'), 'utf-8');
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