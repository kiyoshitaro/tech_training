import * as readline from "readline";
import { DatasetParameters, GraphState, openai } from "../langgraph-template";

export const findMissingParams = (
  requiredParams: string[],
  extractedParams: string[]
): string[] => {
  const missing = requiredParams.filter(
    (required) => !extractedParams.some((extracted) => extracted === required)
  );
  return missing;
};

const paramsFormat = `<name>,<value>:::<name>,<value>`;

/**
 * Read the user input from the command line
 * TODO: implement & add args
 * @param {DatasetParameters[]} missingParams
 */
export function readUserInput(
  missingParams: DatasetParameters[]
): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const missingParamsString = missingParams
    .map((p) => `Name: ${p.name}, Description: ${p.description}`)
    .join("\n----\n");
  const question = `LangTool couldn't find all the required params for the API.\nMissing params:\n${missingParamsString}\nPlease provide the missing params in the following format:\n${paramsFormat}\n`;

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * Parse the user input string into a key-value pair
 * TODO: implement
 * @param {string} input
 */
export function parseUserInput(input: string): Record<string, string> {
  if (!input.includes(":::")) {
    const [key, value] = input.split(",");
    return { [key]: value };
  }

  const splitParams = input.split(":::");
  let params: Record<string, string> = {};
  splitParams.forEach((param) => {
    const [key, value] = param.split(",");
    params = { ...params, [key]: value };
  });
  return params;
}

/**
 * @param {GraphState} state
 */
export async function requestParams(
  state: GraphState
): Promise<Partial<GraphState>> {
  const { bestApi, params } = state;
  if (!bestApi) {
    throw new Error("No best API found");
  }
  const requiredParamsKeys = bestApi.required_parameters.map(
    ({ name }) => name
  );
  const extractedParamsKeys = Object.keys(params ?? {});
  const missingParams = findMissingParams(
    requiredParamsKeys,
    extractedParamsKeys
  );
  const missingParamsSchemas = missingParams
    .map((missingParamKey) =>
      bestApi.required_parameters.find(({ name }) => name === missingParamKey)
    )
    .filter((p) => p !== undefined) as DatasetParameters[];

  const userInput = await readUserInput(missingParamsSchemas);
  const parsedUserInput = parseUserInput(userInput);

  return {
    params: {
      ...params,
      ...parsedUserInput,
    },
  };
}

// (async () => {
//   await requestParams({
//     llm: openai,
//     query:
//       "I'm researching WhatsApp for Business accounts. Can you check if the number 9876543210 is a WhatsApp for Business account? Also, provide the business description, website, email, business hours, address, and category if it is.",
//     categories: [],
//     apis: [],
//     bestApi: {
//       id: "a7c44eb0-c7f2-446a-b57e-45d0f629c50c",
//       category_name: "Data",
//       tool_name: "whatsapp data",
//       api_name: "Fetch business data",
//       api_description:
//         "The endpoint will provide: `description`, `website`, `email`, `business hours`, `address` and `category`; if the number is a whatsapp for business account.",
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
//       api_url: "https://whatsapp-data.p.rapidapi.com/bizinfo",
//     },
//     params: null,
//     response: null,
//   });
// })();
