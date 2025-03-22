import { AzureOpenAIEmbeddings, AzureOpenAIInput, AzureChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import {
    AzureAISearchVectorStore,
    AzureAISearchConfig,
    AzureAISearchAddDocumentsOptions
} from "@langchain/community/vectorstores/azure_aisearch";
import type { Document } from "@langchain/core/documents";
import type { EmbeddingsInterface } from "@langchain/core/embeddings";

const azureOpenAIApiChatInstanceName= process.env.AZURE_OPENAI_CHAT_INSTANCE;
const azureOpenAIApiChatKey= process.env.AZURE_OPENAI_CHAT_KEY;
const chatDeployment = "gpt-4o-mini";
const chatApiVersion = "2024-10-21";


const model = new AzureChatOpenAI({
  azureOpenAIApiKey: azureOpenAIApiChatKey, 
  azureOpenAIApiInstanceName: azureOpenAIApiChatInstanceName, 
  azureOpenAIApiDeploymentName: chatDeployment, 
  azureOpenAIApiVersion: chatApiVersion
});

// Schema for the vector store configuration
export const azureAISearchConfigSchema = z.object({
  key: z.string(),
  endpoint: z.string(),
  indexName: z.string(),
});

// Use z.infer to define the parameter type for querying
export const getQuerySchema = z.object({
  // Here we still use z.any() for embeddingsClient, or you can refine this if desired.
  embeddingsClient: z.any().describe("embeddings client to use for querying"),
  storeConfig: azureAISearchConfigSchema.describe("configuration for the vector store"),
  location: z.string().describe("query to search within the vector store"),
});

export const getQueryDescription = "Get query results from vector store.";

// Change the function signature to accept a single args object whose type is inferred from getQuerySchema.
export async function queryVectorStore(
  args: z.infer<typeof getQuerySchema>
): Promise<string> {
  const { embeddingsClient, storeConfig, location } = args;
  const store = new AzureAISearchVectorStore(embeddingsClient, storeConfig); // Initialize the vector store here
  if (!store) {
    throw new Error("Vector store is not initialized.");
  }
  // Create a retriever from the vector store, you can pass parameters (e.g., number of documents)
  const retriever = store.asRetriever(3);
  const retrievedDocuments: Document[] = await retriever.invoke(location);
  // For simplicity, join the page content of returned documents
  return retrievedDocuments.map((doc: Document) => doc.pageContent).join("\n---\n");
}

export const getVectorStoreDocumentsFromQueryTool = tool(queryVectorStore, {
  name: "getVectorStoreQueryDocuments",
  schema: getQuerySchema,
  description: getQueryDescription,
});

export const gpt4oMiniModel = model;