import { tool } from "@langchain/core/tools";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createReactAgent, ToolNode } from "@langchain/langgraph/prebuilt";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

import "dotenv/config";

import {
  createEmbeddingClient,
  getAzureChatOpenAI,
  getChatCompletions,
} from "./azure/azure-open-ai";
import {
  createAdminAzureAiSearchVectorStoreFromDocuments,
  getSearchChain,
} from "./azure/azure-ai-search-vector-store";

import { loadTextFromFile } from "./langchain/loaders";
import {
  createCombineDocsChainWrapper,
  createRetrievalChainWrapper,
} from "./langchain/chains";

import { gpt4oMiniModel, getVectorStoreDocumentsFromQueryTool } from "./azure/tool-azure-ai-search";

const query1 =
  "What actions are needed to achieve racial equality and freedom according to Martin Luther King Jr. in his 'I Have a Dream' speech?";

const query2 =
  "What does Martin Luther King Jr. say are the harms to racial equality and freedom in his 'I Have a Dream' speech?";

const aiSearchToolNode = new ToolNode([getVectorStoreDocumentsFromQueryTool]);
// Maximum number of cycles allowed in the graph.
const MAX_ITERATIONS = 2;
const model = gpt4oMiniModel;
const tavilySearchTool = new TavilySearchResults({ maxResults: 3, topic: "MLK" });
const tavilySearchNode = new ToolNode([tavilySearchTool]);


// Update the workflow graph to include the new Tavily search node.
// For example, add an edge from the agent node to the tavily node and back.
function shouldInvokeTavily({ messages }: typeof MessagesAnnotation.State): boolean {
  // As an example you might check if the last human message contains the keyword "latest"
  const lastMessage = messages[messages.length - 1];
  return typeof lastMessage?.content === "string" && lastMessage.content.toLowerCase().includes("latest");
}
async function logState(state: typeof MessagesAnnotation.State) {
  console.log("LOG - Current state:", JSON.stringify(state, null, 2));
  return state; // pass state along unmodified
}
// Define the function that determines whether to continue or not
function shouldContinue(state: typeof MessagesAnnotation.State & { iteration?: number }): string {

  console.log("Iteration:", state.iteration);
  const iteration = state.iteration ?? 0;

  // debug
  return "__end__";


  // If we've reached the maximum iterations, end the graph.
  if (iteration >= MAX_ITERATIONS) {
    return "__end__";
  }

  // Example: if the last message from the agent contains a tool call, route to tools,
  // otherwise, continue normally.
  const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
  if (lastMessage.tool_calls?.length) {
    // Increase iteration count as we are recursing
    state.iteration = iteration + 1;
    return "tools";
  }
  return "__end__";
}

// Define the function that calls the model
async function callModel(state: typeof MessagesAnnotation.State) {
  const response = await model.invoke(state.messages);

  // We return a list, because this will get added to the existing list
  return { messages: [response] };
}

async function answerFromGraph() {
  // Define a new graph
  // const workflow = new StateGraph(MessagesAnnotation)
  //   .addNode("agent", callModel)
  //   .addEdge("__start__", "agent")
  //   // Add the vector store tool node and its edge
  //   .addNode("tools", aiSearchToolNode)
  //   .addEdge("tools", "agent")
  //   // Add the Tavily search node and its edges
  //   .addNode("tavily", tavilySearchNode)
  //   .addEdge("agent", "tavily")
  //   .addEdge("tavily", "agent")
  //   .addConditionalEdges("agent", shouldContinue);

  const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", callModel)
    .addEdge("__start__", "agent")
    // Agent calls the vector store tool node ("tools")
    .addNode("tools", aiSearchToolNode)
    .addEdge("agent", "tools") // Agent output (from AI Search) is passed to tools

    .addNode("logAfterTools", logState)
    .addEdge("tools", "logAfterTools")
    .addEdge("logAfterTools", "__end__");

  // Finally, we compile it into a LangChain Runnable.
  const app = workflow.compile();

  const initialState = { messages: [new HumanMessage(query1)], iteration: 0 };


  // Use the agent
  const finalState = await app.invoke(initialState);
  console.log(finalState.messages[finalState.messages.length - 1].content);

  const nextState = await app.invoke({
    // Including the messages from the previous run gives the LLM context.
    // This way it knows we're asking about the weather in NY
    messages: [...finalState.messages, new HumanMessage(query2)],
  });
  console.log(nextState.messages[nextState.messages.length - 1].content);
}

answerFromGraph().catch(console.error);
