import { AzureOpenAIEmbeddings, AzureOpenAIInput, AzureChatOpenAI } from "@langchain/openai";

import 'dotenv/config'

// Azure OpenAI Instance - embedding
const azureOpenAIApiInstanceName= process.env.AZURE_OPENAI_EMBEDDING_INSTANCE;
const azureOpenAIApiKey= process.env.AZURE_OPENAI_EMBEDDING_KEY;
const embeddingDeployment= "text-embedding-ada-002";
const embeddingApiVersion= "2023-05-15";

export function createEmbeddingClient(): AzureOpenAIEmbeddings{

  const config = {
    azureOpenAIApiKey: azureOpenAIApiKey, 
    azureOpenAIApiInstanceName: azureOpenAIApiInstanceName, 
    azureOpenAIApiEmbeddingsDeploymentName: embeddingDeployment, 
    azureOpenAIApiVersion: embeddingApiVersion, 
    maxRetries: 1,
  };
  console.log("Embeddings client ", config);

  const embeddings = new AzureOpenAIEmbeddings(config);

  return embeddings;
}