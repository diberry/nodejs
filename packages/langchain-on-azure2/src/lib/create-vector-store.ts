import {
    AzureAISearchVectorStore,
    AzureAISearchConfig,
    AzureAISearchAddDocumentsOptions
} from "@langchain/community/vectorstores/azure_aisearch";
import type { Document } from "@langchain/core/documents";
import type { EmbeddingsInterface } from "@langchain/core/embeddings";

export async function createAzureAiSearchVectorStoreFromDocuments(
    documents: Document[],
    embeddings: EmbeddingsInterface,
    config: AzureAISearchConfig,
    options?: AzureAISearchAddDocumentsOptions
): Promise<AzureAISearchVectorStore> {


    console.log(config);

    const vectorStore = AzureAISearchVectorStore.fromDocuments(
        documents,
        embeddings,
        config,
        options
    );
    return vectorStore;
}