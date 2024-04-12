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
  var imageAsBase64 = fs.readFileSync(path.join(__dirname, '../assets/invoice.png'), 'base64');

  const openai = new OpenAI({
    apiKey: openAIKey,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      // { role: "system", content: "You are a math professor." },
      // { role: "user", content: "Who are you?" },
      {
        role: "user", content: [
          {
            "type": "text",
            "text": "What’s in this image?",
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