import { AzureOpenAIEmbeddings, AzureOpenAIInput, AzureChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { queryVectorStore } from "./azure-ai-search";


const azureOpenAIApiChatInstanceName= process.env.AZURE_OPENAI_CHAT_INSTANCE;
const azureOpenAIApiChatKey= process.env.AZURE_OPENAI_CHAT_KEY;
const chatDeployment = "gpt-4o-mini";
const chatApiVersion = "2024-10-21";

const model = new AzureChatOpenAI ({
  azureOpenAIApiKey: azureOpenAIApiChatKey, 
  azureOpenAIApiInstanceName: azureOpenAIApiChatInstanceName, 
  azureOpenAIApiDeploymentName: chatDeployment, 
  azureOpenAIApiVersion: chatApiVersion
});

export const getQuerySchema = z.object({
  location: z.string().describe("query to search within the vector store"),
});

export const getQueryDescription = "Get query results from vector store.";

export const getVectorStoreDocumentsFromQueryTool = tool(queryVectorStore, {
  name: "getVectorStoreQueryDocuments",
  schema: getQuerySchema,
  description: getQueryDescription,
});

export const tools = [getVectorStoreDocumentsFromQueryTool];
export const gpt4oMiniModel = model;