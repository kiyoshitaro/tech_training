import { END, MemorySaver, START, StateGraph } from "@langchain/langgraph";

interface State {
  total: number;
  turn?: string;
}

const builder = new StateGraph<State>({
  channels: {
    total: {
      value: (existing: number, updated?: number) => {
        // console.log(existing, updated, "ss");
        return existing + (updated ?? 0);
      },
      default: () => 0,
    },
    turn: {
      value: (x?: string, y?: string) => {
        return y ?? x ?? "";
      },
      default: () => "",
    },
  },
})
  .addNode("add_one", (_state) => ({ total: 1 }))
  .addNode("double", (state) => ({ total: state.total }))
  .addEdge(START, "add_one")
  //   .addEdge("add_one", END);
  .addConditionalEdges("add_one", (state) => (state.total < 5 ? "double" : END))
  .addEdge("double", "add_one");
const memory = new MemorySaver();

(async () => {
  const graphG = builder.compile({ checkpointer: memory });
  //   const graphG = builder.compile();
  let config = { configurable: { thread_id: "some-thread" } };
  //   //   NOTE: 1 time +1 from start, 1 time +1 from add_one
  //   const result = await graphG.invoke({ total: 1, turn: "First Turn" }, config);
  //   console.log(result);
  //   // { total: 2, turn: 'First Turn' }

  //   const result2 = await graphG.invoke({ turn: "Next Turn" }, config);
  //   console.log(result2);
  //   // { total: 3, turn: 'Next Turn' }

  //   const result3 = await graphG.invoke({ total: 5 }, config);
  //   console.log(result3);
  //   // { total: 9, turn: 'Next Turn' }
  //   const result4 = await graphG.invoke(
  //     { total: 5 },
  //     { configurable: { thread_id: "new-thread-id" } }
  //   );
  //   console.log(result4);
  //   // { total: 6 }

  for await (const step of await graphG.stream(
    { total: 1 },
    {
      ...config,

      streamMode: "values",
    }
  )) {
    console.log(step);
  }
})();
