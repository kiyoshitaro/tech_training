import { StructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DatasetSchema, GraphState, openai } from "../langgraph-template";

/**
 * Given a users query, choose the API which best
 * matches the query.
 */
export class SelectAPITool extends StructuredTool {
  schema: z.ZodObject<
    {
      api: z.ZodEnum<[string, ...string[]]>;
    },
    "strip",
    z.ZodTypeAny,
    {
      api?: string;
    },
    {
      api?: string;
    }
  >;

  name = "Select_API";

  description: string;

  apis: DatasetSchema[];

  constructor(apis: DatasetSchema[], query: string) {
    super();
    this.description = SelectAPITool.createDescription(apis, query);
    this.schema = z.object({
      api: z
        .enum(apis.map((api) => api.api_name) as [string, ...string[]])
        .describe("The name of the API which best matches the query."),
    });
    this.apis = apis;
  }

  static createDescription(apis: DatasetSchema[], query: string): string {
    const description = `Given the following query by a user, select the API which will best serve the query.

Query: ${query}

APIs:
${apis
  .map(
    (api) => `Tool name: ${api.tool_name}
API Name: ${api.api_name}
Description: ${api.api_description}
Parameters: ${[...api.required_parameters, ...api.optional_parameters]
      .map((p) => `Name: ${p.name}, Description: ${p.description}`)
      .join("\n")}`
  )
  .join("\n---\n")}`;

    return description;
  }

  async _call(input: z.infer<typeof this.schema>): Promise<string> {
    const { api: apiName } = input;
    const bestApi = this.apis.find((a) => a.api_name === apiName);
    if (!bestApi) {
      throw new Error(
        `API ${apiName} not found in list of APIs: ${this.apis
          .map((a) => a.api_name)
          .join(", ")}`
      );
    }
    return JSON.stringify(bestApi);
  }
}

/**
 * @param {GraphState} state
 */
export async function selectApi(
  state: GraphState
): Promise<Partial<GraphState>> {
  const { llm, query, apis } = state;
  if (apis === null || apis.length === 0) {
    throw new Error("No APIs passed to select_api_node");
  }

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an expert software engineer, helping a junior engineer select the best API for their query.
Given their query, use the 'Select_API' tool to select the best API for the query.`,
    ],
    ["human", `Query: {query}`],
  ]);

  const tool = new SelectAPITool(apis, query);

  const modelWithTools = llm.withStructuredOutput(tool);

  const chain = prompt.pipe(modelWithTools).pipe(tool);

  const response = await chain.invoke({
    query,
  });
  const bestApi: DatasetSchema = JSON.parse(response);
  // {
  //   id: "8b89304b-69a3-4bf6-b5e0-3aed5ba50936",
  //   category_name: "Communication",
  //   tool_name: "Zipwhip",
  //   api_name: "conversation/delete",
  //   api_description:
  //     "Deletes the conversation based on the provided conversation ID. It also deletes the associated messages.",
  //   required_parameters: [
  //     {
  //       name: "fingerprint",
  //       type: "STRING",
  //       description:
  //         "The unique identifier for a conversation. This can be retrieved from a conversation/list.",
  //       default: "",
  //     },
  //     {
  //       name: "session",
  //       type: "STRING",
  //       description:
  //         "This is the sessionKey that is returned from user/login. sessionKeys do not expire. Because of this, it is recommended that you do a single user/login and then save the sessionKey locally for future web calls.",
  //       default: "",
  //     },
  //   ],
  //   optional_parameters: [],
  //   method: "GET",
  //   template_response: {
  //     success: "bool",
  //     response: {
  //       desc: "str",
  //       code: "int",
  //       path: "str",
  //     },
  //     sessions: "NoneType",
  //   },
  //   api_url: "https://community-zipwhip.p.rapidapi.com/conversation/delete",
  // },
  return {
    bestApi,
  };
}

// (async () => {
//   await selectApi({
//     llm: openai,
//     query:
//       "I'm researching WhatsApp for Business accounts. Can you check if the number 9876543210 is a WhatsApp for Business account? Also, provide the business description, website, email, business hours, address, and category if it is.",
//     categories: [],
//     apis: [
//       {
//         id: "8b89304b-69a3-4bf6-b5e0-3aed5ba50936",
//         category_name: "Communication",
//         tool_name: "Zipwhip",
//         api_name: "conversation/delete",
//         api_description:
//           "Deletes the conversation based on the provided conversation ID. It also deletes the associated messages.",
//         required_parameters: [
//           {
//             name: "fingerprint",
//             type: "STRING",
//             description:
//               "The unique identifier for a conversation. This can be retrieved from a conversation/list.",
//             default: "",
//           },
//           {
//             name: "session",
//             type: "STRING",
//             description:
//               "This is the sessionKey that is returned from user/login. sessionKeys do not expire. Because of this, it is recommended that you do a single user/login and then save the sessionKey locally for future web calls.",
//             default: "",
//           },
//         ],
//         optional_parameters: [],
//         method: "GET",
//         template_response: {
//           success: "bool",
//           response: {
//             desc: "str",
//             code: "int",
//             path: "str",
//           },
//           sessions: "NoneType",
//         },
//         api_url: "https://community-zipwhip.p.rapidapi.com/conversation/delete",
//       },
//       {
//         id: "a7c44eb0-c7f2-446a-b57e-45d0f629c50c",
//         category_name: "Data",
//         tool_name: "whatsapp data",
//         api_name: "Fetch business data",
//         api_description:
//           "The endpoint will provide: `description`, `website`, `email`, `business hours`, `address` and `category`; if the number is a whatsapp for business account.",
//         required_parameters: [
//           {
//             name: "phone",
//             type: "NUMBER",
//             description: "",
//             default: "34655719560",
//           },
//         ],
//         optional_parameters: [],
//         method: "GET",
//         template_response: {
//           message: "str",
//         },
//         api_url: "https://whatsapp-data.p.rapidapi.com/bizinfo",
//       },
//       {
//         id: "f657180c-3685-410d-8c71-a5f7632602f1",
//         category_name: "Data",
//         tool_name: "whatsapp data",
//         api_name: "Is whatsapp for business?",
//         api_description:
//           "Requests to this endpoint will return `true` if the number is a **Whatsapp for Business** account, or `false` if it's not.",
//         required_parameters: [
//           {
//             name: "phone",
//             type: "NUMBER",
//             description: "",
//             default: "34655719560",
//           },
//         ],
//         optional_parameters: [],
//         method: "GET",
//         template_response: {
//           message: "str",
//         },
//         api_url: "https://whatsapp-data.p.rapidapi.com/isbiz",
//       },
//     ],
//     bestApi: null,
//     params: null,
//     response: null,
//   });
// })();
