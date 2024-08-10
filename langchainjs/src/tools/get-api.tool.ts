import path from "path";
import fs from "fs";
import { DatasetSchema, GraphState, openai } from "../langgraph-template";

export async function getApis(state: GraphState) {
  const { categories } = state;
  if (!categories || categories.length === 0) {
    throw new Error("No categories passed to get_apis_node");
  }
  const allData: DatasetSchema[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./corpus.json"), "utf8")
  );
  const apis = categories
    .map((c) => allData.filter((d) => d.category_name === c))
    .flat();
  // [{
  //   id: '09e1d6af-ade1-4bea-a2e8-ce49e547fff8',
  //   category_name: 'Social',
  //   tool_name: 'Socie',
  //   api_name: 'Get Member',
  //   api_description: 'Return a specific member. To do this, you need the `externalId` you gave the member when you created it or the `id` provided by Socie.',
  //   required_parameters: [ [Object] ],
  //   optional_parameters: [ [Object] ],
  //   method: 'GET',
  //   api_url: 'https://socie.p.rapidapi.com/api/v1/members/{identifier}'
  // }]
  return {
    apis,
  };
}
// (async () => {
//   getApis({
//     llm: openai,
//     query:
//       "I'm researching WhatsApp for Business accounts. Can you check if the number 9876543210 is a WhatsApp for Business account? Also, provide the business description, website, email, business hours, address, and category if it is.",
//     categories: [
//       "Data",
//       "Database",
//       "Text_Analysis",
//       "Visual_Recognition",
//       "Artificial_Intelligence_Machine_Learning",
//       "Email",
//       "SMS",
//       "Social",
//       "Communication",
//     ],
//     apis: null,
//     bestApi: null,
//     params: null,
//     response: null,
//   });
// })();
