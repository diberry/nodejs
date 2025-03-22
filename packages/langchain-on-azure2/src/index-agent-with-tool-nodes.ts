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

const model = gpt4oMiniModel;
//  const toolNode = new ToolNode(tools);
//const tools = [new TavilySearchResults({ maxResults: 3 })];
const toolNode = new ToolNode([getVectorStoreDocumentsFromQueryTool]);

// Define the function that determines whether to continue or not
function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }
  // Otherwise, we stop (reply to the user) using the special "__end__" node
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
  const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", callModel)
    .addEdge("__start__", "agent") // __start__ is a special name for the entrypoint
    .addNode("tools", toolNode)
    .addEdge("tools", "agent")
    .addConditionalEdges("agent", shouldContinue);

  // Finally, we compile it into a LangChain Runnable.
  const app = workflow.compile();

  // Use the agent
  const finalState = await app.invoke({
    messages: [new HumanMessage(query1)],
  });
  console.log(finalState.messages[finalState.messages.length - 1].content);

  const nextState = await app.invoke({
    // Including the messages from the previous run gives the LLM context.
    // This way it knows we're asking about the weather in NY
    messages: [...finalState.messages, new HumanMessage(query2)],
  });
  console.log(nextState.messages[nextState.messages.length - 1].content);
}

answerFromGraph().catch(console.error);
