import {
    AzureAISearchVectorStore,
    AzureAISearchConfig,
    AzureAISearchAddDocumentsOptions
} from "@langchain/community/vectorstores/azure_aisearch";

import type { Document } from "@langchain/core/documents";
import type { EmbeddingsInterface } from "@langchain/core/embeddings";
  import { ChatPromptTemplate } from "@langchain/core/prompts";
  import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
  import { createRetrievalChain } from "langchain/chains/retrieval";


  import 'dotenv/config'

 // Azure AI Search
 const endpoint = process.env.AZURE_AISEARCH_ENDPOINT;
 const adminKey = process.env.AZURE_AISEARCH_ADMIN_KEY;
 const adminQueryKey = process.env.AZURE_AISEARCH_QUERY_KEY;
const indexName = process.env.AZURE_AISEARCH_INDEX_NAME;

/*
export interface AzureAISearchConfig {
    readonly client?: SearchClient<AzureAISearchDocument>;
    readonly indexName?: string;
    readonly endpoint?: string;
    readonly key?: string;
    readonly credentials?: KeyCredential | TokenCredential;
    readonly search?: AzureAISearchQueryOptions;
}
*/


export async function createAzureAiSearchVectorStoreFromDocuments(
    documents: Document[],
    embeddings: EmbeddingsInterface,
): Promise<AzureAISearchVectorStore> {

    const config ={
        key: adminKey,
        endpoint: endpoint,
        indexName: indexName
    };
    console.log("Vector store ", config);

    const vectorStore = AzureAISearchVectorStore.fromDocuments(
        documents,
        embeddings,
        config
    );
    return vectorStore;
}
export async function queryVectorStore(store: any, query:any ) {
  if (!store) {
    throw new Error("Vector store is not initialized.");
  }
  // Create a retriever from the vector store, you can pass parameters (e.g., number of documents)
  const retriever = store.asRetriever({ count: 3 });
  const retrievedDocuments = await retriever.invoke(query);
  // For simplicity, join the page content of returned documents
  return retrievedDocuments.map((doc:any) => doc.pageContent).join("\n---\n");
}

export function getQueryTool(store: any){
    return {
        name: "VectorStoreQuery",
        description:
          "Searches the Azure AI Search vector store for relevant context based on the user input.",
        func: queryVectorStore.bind(null, store),
    };
}

export async function getSearchChain(searchStore: any, openAiClient:any, query: string):Promise<string>{
    
    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "Answer the user's questions based on the below context:\n\n{context}",
      ],
      ["human", query],
    ]);
    console.log(questionAnsweringPrompt);

    const combineDocsChain = await createStuffDocumentsChain({
        llm: openAiClient,
        prompt: questionAnsweringPrompt,
    });
    console.log("Create docs chain");
  
  const chain = await createRetrievalChain({
    retriever: searchStore.asRetriever(),
    combineDocsChain,
  });
  console.log("Create retrieval chain");

  const response = await chain.invoke({
    input: "What is the president's top priority regarding prices?",
  });
  console.log("Use chain");
  console.log(response.answer);
  return response.answer;
}