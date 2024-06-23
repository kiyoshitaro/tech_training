import OpenAI from "openai";
import * as dotenv from "dotenv";
import path from 'path';
import fs from 'fs'
import { observeOpenAI } from "langfuse";

dotenv.config({ path: path.join(__dirname, '../.env') });
const openAIKey = process.env.OPENAI_API_KEY;
const functions = [
  {
    "name": "get_car_price",
    "description": "this function is used to get the price of the car given the name",
    "parameters": {
        "type": "object",
        "properties": {
            "car_name": {
                "type": "string",
                "description": "name of the car to get the price"
            }
        },
        "required": ["car_name"]
    }
  }
];

const tools: any[] = [
  // {
  //   type: "function",
  //   function: {
  //     name: "get_current_weather",
  //     description: "Call this function by default",
  //     parameters: {
  //       type: "object",
  //       properties: {
  //         location: {
  //           type: "string",
  //           description: "The city and state, e.g. San Francisco, CA"
  //         }
  //       },
  //       required: ["location"]
  //     }
  //   }
  // },
  // {
  //   type: "function",
  //   function: {
  //     name: "search_bing",
  //     description: "Search the web for content on Bing. This allows users to search online/the internet/the web for content.",
  //     parameters: {
  //       type: "object",
  //       properties: {
  //         query: {
  //           type: "string",
  //           description: "The search query string"
  //         }
  //       },
  //       required: ["query"]
  //     }
  //   }
  // },
  //   {
  //   type: "function",
  //   function: {
  //     name: "generate_password",
  //     description: "Generate a random password with specified criteria.",
  //     parameters: {
  //       type: "object",
  //       properties: {
  //         length: {
  //           type: "integer",
  //           description: "The length of the password"
  //         }
  //       },
  //       required: ["length"]
  //     }
  //   }
  // },
    {
    type: "function",
    function: {
        "name": "get_car_price",
        "description": "this function is used to get the price of the car given the name",
        "parameters": {
            "type": "object",
            "properties": {
                "car_name": {
                    "type": "string",
                    "description": "name of the car to get the price"
                }
            },
            "required": ["car_name"]
        }
      }
    }
];
(async () => {
  const openai = observeOpenAI(new OpenAI({
    // apiKey: openAIKey,
    baseURL: 'http://localhost:3001/v1',
    timeout: 10000000,
  }),     
  {
    clientInitParams: {
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      baseUrl: "http://localhost:1234", // 🇪🇺 EU region
  }});
  const completion = await openai.chat.completions.create({
    messages: [
      // {
      //   role: "system",
      //   content: "You are a helpful assistant give me short answer"
      // },
      { role: "user", content: "What is the price of the car named 'Rhino'?" },
      // { role: "user", content: "what's the weather like in San Francisco?" },
      // { role: "user", content: "I need a new password with length 100" },
    ],
    model: "gpt-4-vision-preview",
    functions: functions,
    // tools: tools,
    temperature: 0.0,
    tool_choice: 'auto'
  });
  console.log(completion.choices[0]);
  await openai.flushAsync();

})()