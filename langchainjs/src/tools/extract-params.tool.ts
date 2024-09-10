import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { DatasetSchema, GraphState, openai } from "../langgraph-template";
import { StructuredTool } from "langchain/tools";

/**
 * @param {GraphState} state
 */

export class ExtractParameters extends StructuredTool {
  constructor(api: DatasetSchema, query: string) {
    super();
    this.description = ExtractParameters.createDescription(api, query);
  }
  schema = z
    .object({
      params: z
        .record(z.string())
        .describe("The parameters extracted from the query.")
        .optional(),
    })
    .describe("The extracted parameters from the query.");

  name = "ExtractParameters";
  description: string;
  // description = "Given a user query, extract parameters which can use in api.";

  static createDescription(api: DatasetSchema, query: string): string {
    return `Given a user query ${query}, extract parameters which can use in api ${JSON.stringify(
      api
    )}`;
  }

  async _call(input: z.infer<typeof this.schema>): Promise<string> {
    console.log("object", input);
    return JSON.stringify(input);
  }
}

export async function extractParameters(
  state: GraphState
): Promise<Partial<GraphState>> {
  const { llm, query, bestApi } = state;

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an expert software engineer. You're provided with a list of required and optional parameters for an API, along with a users query.

Given the query and the parameters, use the 'extract_params' tool to extract the parameters from the query.

If the query does not contain any of the parameters, do not return params.

Required parameters: {requiredParams}

Optional parameters: {optionalParams}`,
    ],
    ["human", `Query: {query}`],
  ]);
  const tool = new ExtractParameters(bestApi, query);
  const modelWithTools = llm.withStructuredOutput(tool);

  // const modelWithTools = llm.withStructuredOutput(schema, {
  //   name: "extract_params",
  // });

  const chain = prompt.pipe(modelWithTools).pipe(tool);

  const requiredParams = bestApi?.required_parameters
    .map(
      (p) => `Name: ${p.name}, Description: ${p.description}, Type: ${p.type}`
    )
    .join("\n");
  const optionalParams = bestApi?.optional_parameters
    .map(
      (p) => `Name: ${p.name}, Description: ${p.description}, Type: ${p.type}`
    )
    .join("\n");

  const res: any = await chain.invoke({
    query,
    requiredParams,
    optionalParams,
  });
  return {
    params: res.params ?? null,
  };
}

// (async () => {
//   await extractParameters({
//     llm: openai,
//     query:
//       "I'm researching WhatsApp for Business accounts. Can you check if the number 9876543210 is a WhatsApp for Business account? Also, provide the business description, website, email, business hours, address, and category if it is.",
//     bestApi: {
//       id: "f657180c-3685-410d-8c71-a5f7632602f1",
//       category_name: "Data",
//       tool_name: "whatsapp data",
//       api_name: "Is whatsapp for business?",
//       api_description:
//         "Requests to this endpoint will return `true` if the number is a **Whatsapp for Business** account, or `false` if it's not.",
//       required_parameters: [
//         {
//           name: "phone",
//           type: "NUMBER",
//           description: "",
//           default: "34655719560",
//         },
//       ],
//       optional_parameters: [],
//       method: "GET",
//       template_response: {
//         message: "str",
//       },
//       api_url: "https://whatsapp-data.p.rapidapi.com/isbiz",
//     },
//     params: null,
//     response: null,
//     apis: null,
//     categories: null,
//   });
// })();
