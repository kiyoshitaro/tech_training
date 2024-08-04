import { END, START, StateGraph, StateGraphArgs } from "@langchain/langgraph";
import { RunnableConfig } from "@langchain/core/runnables";

interface IState {
  input: string;
  results?: string;
  result?: string;
}

// This defines the agent state
const graphState: StateGraphArgs<IState>["channels"] = {
  input: {
    value: (x?: string, y?: string) => y ?? x ?? "",
    default: () => "",
  },
  results: {
    value: (x?: string, y?: string) => y ?? x ?? "",
    default: () => "",
  },
  result: {
    value: (x?: string, y?: string) => y ?? x ?? "",
    default: () => "",
  },
};

function node1(state: IState, config?: RunnableConfig) {
  console.log("Node1:", config?.configurable?.user_id);
  return { results: `Node1, ${state.input}!` };
}

// The second parameter is optional
function node2(state: IState) {
  console.log("Node2:", state);
  return {
    result: `Node2, ${state.results}!`,
  };
}

function node3(state: IState) {
  console.log("Node3:", state);
  return state;
}

const builder = new StateGraph({ channels: graphState })
  .addNode("node1", node1)
  .addNode("node2", node2)
  .addNode("node3", node3)
  .addEdge(START, "node1")
  .addEdge("node1", "node2")
  .addEdge("node2", "node3")
  .addEdge("node3", END);

(async () => {
  const graph = builder.compile();

  const result1 = await graph.invoke(
    { input: "Kiyoshi" },
    { configurable: { user_id: "1111" } }
  );
})();
