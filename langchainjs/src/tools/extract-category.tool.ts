import { StructuredTool } from "langchain/tools";
import { z } from "zod";
import { DatasetSchema, GraphState, openai } from "../langgraph-template";
import { ChatPromptTemplate } from "langchain/prompts";
import fs from "fs";
import path from "path";

export const HIGH_LEVEL_CATEGORY_MAPPING = {
  Data_and_Analytics: [
    "Data",
    "Database",
    "Text_Analysis",
    "Visual_Recognition",
    "Artificial_Intelligence_Machine_Learning",
  ],
  Media_and_Entertainment: [
    "Movies",
    "Video_Images",
    "Media",
    "Entertainment",
    "Music",
    "Gaming",
  ],
  Business_and_Finance: [
    "Financial",
    "eCommerce",
    "Finance",
    "Business_Software",
    "Commerce",
    "Payments",
    "Business",
    "Jobs",
  ],
  Health_and_Wellness: ["Health_and_Fitness", "Medical", "Food"],
  Travel_and_Transportation: [
    "Travel",
    "Transportation",
    "Logistics",
    "Location",
  ],
  Education_and_Research: ["Education", "Science"],
  Communication_and_Social: ["Email", "SMS", "Social", "Communication"],
  Security_and_Monitoring: ["Cryptography", "Monitoring", "Cybersecurity"],
  Utilities_and_Tools: [
    "Translation",
    "Tools",
    "Search",
    "Storage",
    "Energy",
    "Devices",
    "Weather",
  ],
  Advertising_and_News: ["Advertising", "News_Media", "Events"],
};
/**
 * Given a users query, extract the high level category which
 * best represents the query.
 *
 * TODO: add schema, name, description, and _call method
 */
export class ExtractHighLevelCategories extends StructuredTool {
  schema = z.object({
    highLevelCategories: z
      .array(
        z
          .enum(
            Object.keys(HIGH_LEVEL_CATEGORY_MAPPING) as [string, ...string[]]
          )
          .describe("An enum of all categories which best match the query.")
      )
      .describe("The high level categories to extract from the query."),
  });

  name = "ExtractHighLevelCategories";

  description =
    "Given a user query, extract the high level category which best represents the query.";

  async _call(input: z.infer<typeof this.schema>): Promise<string> {
    // {
    //   highLevelCategories: [ 'Data_and_Analytics', 'Communication_and_Social' ]
    // }
    const categoriesMapped = input.highLevelCategories
      .map(
        (category) =>
          HIGH_LEVEL_CATEGORY_MAPPING[
            category as keyof typeof HIGH_LEVEL_CATEGORY_MAPPING
          ]
      )
      .flat();
    return JSON.stringify(categoriesMapped);
  }
}

export async function extractCategory(
  state: GraphState
): Promise<Partial<GraphState>> {
  const { llm, query } = state;

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an expert software engineer.

Currently, you are helping a fellow engineer select the best category of APIs based on their query.
You are only presented with a list of high level API categories, and their query.
Think slowly, and carefully select the best category for the query.
Here are all the high level categories, and every tool name that falls under them:
{categoriesAndTools}`,
    ],
    ["human", `Query: {query}`],
  ]);

  const tool = new ExtractHighLevelCategories();
  const modelWithTools = llm.withStructuredOutput(tool);
  // {
  //   highLevelCategories: [ 'Data_and_Analytics', 'Communication_and_Social' ]
  // }
  const chain = prompt.pipe(modelWithTools).pipe(tool);

  const allApis: DatasetSchema[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./corpus.json"), "utf-8")
  );
  const categoriesAndTools = Object.entries(HIGH_LEVEL_CATEGORY_MAPPING)
    .map(([high, low]) => {
      const allTools = allApis.filter((api) => low.includes(api.category_name));
      return `High Level Category: ${high}\nTools:\n${allTools
        .map((item) => `Name: ${item.tool_name}`)
        .join("\n")}`;
    })
    .join("\n\n");
  // High Level Category: Business_and_Finance
  //   Tools:
  //   Name: MarketCI Analytics
  //   Name: Candlestick Chart
  //   Name: Currency Converter_v3
  //   Name: Amazon Turkey Data Scrapeer
  //   Name: Amazon Turkey Data Scrapeer
  //   Name: Amazon Turkey Data Scrapeer
  //   Name: Rankiteo Climate Risk Assessment
  //   Name: Bybit
  //   Name: Bybit
  //   Name: test2
  //   Name: Proxy List
  //   Name: NOWPayments
  //   ...
  const response = await chain.invoke({
    query,
    categoriesAndTools,
  });
  // ["Data","Database","Text_Analysis","Visual_Recognition","Artificial_Intelligence_Machine_Learning","Email","SMS","Social","Communication"]
  const highLevelCategories: string[] = JSON.parse(response);

  return {
    categories: highLevelCategories,
  };
}

// (async () => {
//   await extractCategory({
//     llm: openai,
//     query:
//       "I'm researching WhatsApp for Business accounts. Can you check if the number 9876543210 is a WhatsApp for Business account? Also, provide the business description, website, email, business hours, address, and category if it is.",
//     categories: null,
//     apis: null,
//     bestApi: null,
//     params: null,
//     response: null,
//   });
// })();
