import {
    AzureAISearchVectorStore,
    AzureAISearchConfig,
    AzureAISearchAddDocumentsOptions
} from "@langchain/community/vectorstores/azure_aisearch";

import type { Document } from "@langchain/core/documents";
import type { Runnable } from "@langchain/core/runnables";
import type { EmbeddingsInterface } from "@langchain/core/embeddings";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

import 'dotenv/config'

export async function createAdminAzureAiSearchVectorStoreFromDocuments(
    documents: Document[],
    embeddings: EmbeddingsInterface,
): Promise<AzureAISearchVectorStore> {

    const config: AzureAISearchConfig = {
        key: process.env.AZURE_AISEARCH_ADMIN_KEY,
        endpoint: process.env.AZURE_AISEARCH_ENDPOINT,
        indexName: process.env.AZURE_AISEARCH_INDEX_NAME
    };
    console.log("Vector store ", config);

    // use Admin key
    const vectorStore = AzureAISearchVectorStore.fromDocuments(
        documents,
        embeddings,
        config
    );

    return vectorStore;
}

export async function createAzureAiSearchVectorStore_FromQueryKey(
    embeddings: EmbeddingsInterface,
): Promise<AzureAISearchVectorStore> {

    const config: AzureAISearchConfig = {
        key: process.env.AZURE_AISEARCH_QUERY_KEY,
        endpoint: process.env.AZURE_AISEARCH_ENDPOINT,
        indexName: process.env.AZURE_AISEARCH_INDEX_NAME
    };
    console.log("Vector store ", config);

    // use Query key
    const vectorStore = new AzureAISearchVectorStore(
        embeddings,
        config
    );

    return vectorStore;
}

export async function queryVectorStore(store: AzureAISearchVectorStore, query: string): Promise<string> {
    if (!store) {
        throw new Error("Vector store is not initialized.");
    }
    // Create a retriever from the vector store, you can pass parameters (e.g., number of documents)
    const retriever = store.asRetriever(3);
    const retrievedDocuments: Document[] = await retriever.invoke(query);
    // For simplicity, join the page content of returned documents
    return retrievedDocuments.map((doc: Document) => doc.pageContent).join("\n---\n");
}

export function getQueryTool(store: AzureAISearchVectorStore) {
    return {
        name: "VectorStoreQuery",
        description:
            "Searches the Azure AI Search vector store for relevant context based on the user input.",
        func: queryVectorStore.bind(null, store),
    };
}
/*
messasges = [
    [
      "system",
      "Answer the user's questions based on the below context:\n\n{context}",
    ],
    ["human", query],
  ]

*/
export async function getSearchChain(
    searchStore: AzureAISearchVectorStore,
    openAiClient: any,
    messages: [string, string][],
    query: string
): Promise<Runnable> {

    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages(messages);

    const combineDocsChain = await createStuffDocumentsChain({
        llm: openAiClient,
        prompt: questionAnsweringPrompt,
    });

    const chain = await createRetrievalChain({
        retriever: searchStore.asRetriever(),
        combineDocsChain,
    });

    return chain;
}

export async function getAnswer(
    searchStore: AzureAISearchVectorStore,
    openAiClient: any,
    messages: [string, string][],
    query: string
): Promise<string> {

    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages(messages);

    const combineDocsChain = await createStuffDocumentsChain({
        llm: openAiClient,
        prompt: questionAnsweringPrompt,
    });

    const chain = await createRetrievalChain({
        retriever: searchStore.asRetriever(),
        combineDocsChain,
    });

    const response = await chain.invoke({
        input: "What is the president's top priority regarding prices?",
    });

    return response.answer;
}
/*
messasges = [
    [
      "system",
      "Answer the user's questions based on the below context:\n\n{context}",
    ],
    ["human", query],
  ]

// */
// export async function getSearchChain(searchStore: any, openAiClient: any, messages: any, query: string): Promise<Runnable> {

//     const questionAnsweringPrompt = ChatPromptTemplate.fromMessages(messages);

//     const combineDocsChain = await createStuffDocumentsChain({
//         llm: openAiClient,
//         prompt: questionAnsweringPrompt,
//     });

//     const chain = await createRetrievalChain({
//         retriever: searchStore.asRetriever(),
//         combineDocsChain,
//     });

//     return chain;
// }
// export async function getAnswer (searchStore: any, openAiClient: any, messages: any, query: string): Promise<string> {

//     const questionAnsweringPrompt = ChatPromptTemplate.fromMessages(messages);

//     const combineDocsChain = await createStuffDocumentsChain({
//         llm: openAiClient,
//         prompt: questionAnsweringPrompt,
//     });

//     const chain = await createRetrievalChain({
//         retriever: searchStore.asRetriever(),
//         combineDocsChain,
//     });


//   const response = await chain.invoke({
//     input: "What is the president's top priority regarding prices?",
//   });

// return response.answer;

// }