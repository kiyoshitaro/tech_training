import axios from 'axios';
import * as dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });
const search_bing_metadata = {
    "function": "search_bing",
    "description": "Search the web for content on Bing. This allows users to search online/the internet/the web for content.",
    "arguments": [
        {
            "name": "query",
            "type": "string",
            "description": "The search query string"
        }
    ]
};
const functionList = JSON.stringify(search_bing_metadata, null, 4);
const prompt = `<FUNCTIONS>${functionList}</FUNCTIONS>\n\n[INST] What is weather in San Francisco [/INST]\n\n`;

(async () => {
  const data = await axios({
    method: 'post',
    data: {
      "model": "gpt-4o",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": "What is weather in San Francisco"
        }
      ],
      "tools": [
        {
          "type": "function",
          "function": {
            "name": "get_current_weather",
            "description": "Get the current weather",
            "parameters": {
              "type": "object",
              "properties": {
                "location": {
                  "type": "string",
                  "description": "The city and state, e.g. San Francisco, CA"
                }
              },
              "required": ["location"]
            }
          }
        },
      ]
    },
    url: 'http://0.0.0.0:3001/v1/chat/completions',
    // url: 'https://api.openai.com/v1/chat/completions',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  });
  console.log(JSON.stringify(data?.data, null, 2));
})()