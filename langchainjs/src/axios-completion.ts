import axios from 'axios';
import * as dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../.env') });
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
          "content": "Hello!"
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
    // url: 'http://0.0.0.0:3002/v1/chat/completions',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  });
  console.log(JSON.stringify(data?.data, null, 2));
})()