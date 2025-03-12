import { ChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { queryVectorStore } from "./azure-ai-search";
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
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
