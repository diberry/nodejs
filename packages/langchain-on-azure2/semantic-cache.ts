/*

The Semantic Cache feature is supported with Azure Cosmos DB for NoSQL integration, enabling users to retrieve cached responses based on semantic similarity between the user input and previously cached results. It leverages AzureCosmosDBNoSQLVectorStore, which stores vector embeddings of cached prompts. These embeddings enable similarity-based searches, allowing the system to retrieve relevant cached results.

*/
import {
    AzureCosmosDBNoSQLConfig,
    AzureCosmosDBNoSQLSemanticCache,
} from "@langchain/azure-cosmosdb";
import { AzureOpenAIEmbeddings } from "@langchain/openai";

export const embeddings = new AzureOpenAIEmbeddings();
const config: AzureCosmosDBNoSQLConfig = {
    databaseName: "<DATABASE_NAME>",
    containerName: "<CONTAINER_NAME>",
    // use endpoint to initiate client with managed identity
    connectionString: "<CONNECTION_STRING>",
};

const similarityScoreThreshold = 0.5;
export const cache = new AzureCosmosDBNoSQLSemanticCache(
    embeddings,
    config,
    similarityScoreThreshold
);

