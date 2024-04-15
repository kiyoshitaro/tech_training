import OpenAI from "openai";
import * as dotenv from "dotenv";
import path from 'path';
import fs from 'fs'

dotenv.config({ path: path.join(__dirname, '../.env') });

const openAIKey = process.env.OPENAI_API_KEY;

const toDataUrl = (url: any, callback: any) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

(async () => {
  var imageAsBase64 = fs.readFileSync(path.join(__dirname, '../assets/laso.png'), 'base64');

  const openai = new OpenAI({
    // apiKey: openAIKey,
    baseURL: 'http://localhost:1234/v1'
  });
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Bạn có kiến thức về tử vi." },
      // { role: "user", content: "Who are you?" },
      {
        role: "user", content: [
          {
            "type": "text",
            "text": "Mô tả lá số sau đây",
          },
          {
            "type": "image_url",
            "image_url": {
              "url": `data:image/jpeg;base64,${imageAsBase64}`,
            }
          }
        ]
      },
    ],
    model: "gpt-4-vision-preview",
  });
  console.log(completion.choices[0]);

})()