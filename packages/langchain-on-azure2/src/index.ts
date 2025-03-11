
import {
    AzureAISearchVectorStore,
    AzureAISearchConfig,
    AzureAISearchAddDocumentsOptions
} from "@langchain/community/vectorstores/azure_aisearch";

import 'dotenv/config'

import { createEmbeddingClient, AzureOpenAIEmbeddingsOptions } from "./lib/create-embedding";
import { createAzureAiSearchVectorStoreFromDocuments } from "./lib/create-vector-store";
import { loadTextFromFile } from "./lib/loaders";

// Azure OpenAI
const azureOpenAIApiEmbeddingsDeploymentName= process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME;
const azureOpenAIApiInstanceName= process.env.AZURE_OPENAI_API_INSTANCE_NAME;
const azureOpenAIApiKey= process.env.AZURE_OPENAI_API_KEY;
const azureOpenAIEmbeddingsApiVersion= process.env.EMBEDDING_API_VERSION;

// Azure AI Search
const azureAISearchApiKey= process.env.AZURE_AISEARCH_ADMIN_KEY;
const azureAISearchEndpoint= process.env.AZURE_AISEARCH_ENDPOINT;
const azureAISearchIndexName= process.env.AZURE_AISEARCH_INDEX_NAME;


async function main() {

    const embeddingsOptions: AzureOpenAIEmbeddingsOptions = {
        azureOpenAIApiInstanceName: azureOpenAIApiInstanceName,
        azureOpenAIApiDeploymentName: azureOpenAIApiEmbeddingsDeploymentName,
        azureOpenAIApiKey: azureOpenAIApiKey,
        azureOpenAIApiVersion: azureOpenAIEmbeddingsApiVersion
    }

    const aiSearchConfig: AzureAISearchConfig = {
        key: azureAISearchApiKey,
        endpoint: azureAISearchEndpoint,
        indexName: azureAISearchIndexName
    };

    const embeddingsClient = createEmbeddingClient(embeddingsOptions);
    const embeddings = await embeddingsClient.embedQuery("Hello, world!");
    console.log(embeddings);

    const documents = await loadTextFromFile("./files/i-have-a-dream.txt");

    const vectorStore = await createAzureAiSearchVectorStoreFromDocuments(
        documents,
        embeddingsClient,
        aiSearchConfig
    );

    const resultDocuments = await vectorStore.similaritySearch(
        "What does Martin Luther King Jr. say about racial equality and freedom in his 'I Have a Dream' speech?"
      );

    console.log("Similarity search results:");
    console.log(resultDocuments[0]);
}

main().catch(console.error);
