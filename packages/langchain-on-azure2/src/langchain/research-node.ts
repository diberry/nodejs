import { HumanMessage } from "@langchain/core/messages";
import type { RunnableConfig, Runnable } from "@langchain/core/runnables";

export async function researchNode(
    runAgentNode: any,
    researchAgent: any,
    state: any,
    config?: RunnableConfig,
  ) {
    return runAgentNode({
      state: state,
      agent: researchAgent,
      name: "Researcher",
      config,
    });
  }