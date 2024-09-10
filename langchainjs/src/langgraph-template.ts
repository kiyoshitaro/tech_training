import { END, START, StateGraph } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { extractCategory } from "./tools/extract-category.tool";
import fs from "fs";
import { selectApi } from "./tools/select-api.tool";
import { extractParameters } from "./tools/extract-params.tool";
import { findMissingParams, requestParams } from "./tools/request-params.tool";
import { executeRequest } from "./tools/execute-request.tool";
import * as dotenv from "dotenv";
import path from "path";
import { getApis } from "./tools/get-api.tool";
dotenv.config({ path: path.join(__dirname, "../.env") });
const openAIKey = process.env.OPENAI_API_KEY;
export const openai = new ChatOpenAI({
  openAIApiKey: openAIKey,
  modelName: "gpt-4o-mini",
  temperature: 0,
});

export type DatasetParameters = {
  name: string;
  type: string;
  description: string;
  default: string;
};

export interface DatasetSchema {
  id: string;
  category_name: string;
  tool_name: string;
  api_name: string;
  api_description: string;
  required_parameters: DatasetParameters[];
  optional_parameters: DatasetParameters[];
  method: string;
  template_response: Record<string, any>;
  api_url: string;
}
export type GraphState = {
  /**
   * The LLM to use for the graph
   */
  llm: ChatOpenAI;
  /**
   * The query to extract an API for
   */
  query: string;
  /**
   * The relevant API categories for the query
   */
  categories: string[] | null;
  /**
   * The relevant APIs from the categories
   */
  apis: DatasetSchema[] | null;
  /**
   * The most relevant API for the query
   */
  bestApi: DatasetSchema | null;
  /**
   * The params for the API call
   */
  params: Record<string, string> | null;
  /**
   * The API response
   */
  response: Record<string, any> | null;
};
const graphChannels = {
  llm: null,
  query: null,
  categories: null,
  apis: null,
  bestApi: null,
  params: null,
  response: null,
};

const notImplemented = (state: GraphState): Promise<Partial<GraphState>> => {
  console.log("Not implement");
  return null;
};

const verifyParams = (
  state: GraphState
): "human_loop_node" | "execute_request_node" => {
  const { bestApi, params } = state;
  if (!bestApi) {
    throw new Error("No best API found");
  }
  if (!params) {
    return "human_loop_node";
  }
  const requiredParamsKeys = bestApi.required_parameters.map(
    ({ name }) => name
  );
  const extractedParamsKeys = Object.keys(params);
  const missingKeys = findMissingParams(
    requiredParamsKeys,
    extractedParamsKeys
  );
  if (missingKeys.length > 0) {
    return "human_loop_node";
  }
  return "execute_request_node";
};

function createGraph() {
  const graph = new StateGraph<GraphState>({
    channels: graphChannels,
  })
    .addNode("extract_category_node", extractCategory)
    .addNode("get_apis_node", getApis)
    .addNode("select_api_node", selectApi)
    .addNode("extract_params_node", extractParameters)
    .addNode("human_loop_node", requestParams)
    .addNode("execute_request_node", executeRequest)
    .addEdge("extract_category_node", "get_apis_node")
    .addEdge("get_apis_node", "select_api_node")
    .addEdge("select_api_node", "extract_params_node")

    .addConditionalEdges("extract_params_node", verifyParams)
    .addConditionalEdges("human_loop_node", verifyParams)
    .addEdge(START, "extract_category_node")
    .addEdge("execute_request_node", END);
  const app = graph.compile();
  return app;
}

const run = async () => {
  const query =
    "I'm researching WhatsApp for Business accounts. Can you check if the number 9876543210 is a WhatsApp for Business account? Also, provide the business description, website, email, business hours, address, and category if it is.";

  const app = createGraph();

  const stream = await app.stream({
    llm: openai,
    query,
  });
  let finalResult: GraphState | null = null;
  for await (const event of stream) {
    console.log("\n------\n");
    if (Object.keys(event)[0] === "execute_request_node") {
      console.log("---FINISHED---");
      finalResult = event.execute_request_node;
    } else {
      console.log("Stream event: ", Object.keys(event)[0]);
      // Uncomment the line below to see the values of the event.
      // console.log("Value(s): ", Object.values(event)[0]);
    }
  }

  if (!finalResult) {
    throw new Error("No final result");
  }
  if (!finalResult.bestApi) {
    throw new Error("No best API found");
  }

  console.log("---FETCH RESULT---");
  console.log(finalResult.response);

  // const relevantIds = [
  //   "8044d241-0f5b-403d-879a-48b080fd4bf6",
  //   "a7c44eb0-c7f2-446a-b57e-45d0f629c50c",
  //   "f657180c-3685-410d-8c71-a5f7632602f1",
  // ];
  // const resultHasProperIds = relevantIds.includes(finalResult.bestApi.id);
  // if (resultHasProperIds) {
  //   console.log("✅✅✅The result has the proper ids✅✅✅");
  // } else {
  //   console.log("❌❌❌The result does not have the proper ids❌❌❌");
  // }
};
(async () => {
  await run();
})();
// https://github.com/bracesproul/langtool-template/tree/finished
