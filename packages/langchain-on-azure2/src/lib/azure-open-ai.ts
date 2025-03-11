import { AzureOpenAIEmbeddings, AzureOpenAIInput, AzureChatOpenAI } from "@langchain/openai";

import 'dotenv/config'

// Azure OpenAI Instance
const azureOpenAIApiInstanceName= process.env.AZURE_OPENAI_API_INSTANCE_NAME;
const azureOpenAIApiKey= process.env.AZURE_OPENAI_API_INSTANCE_KEY;

// Azure OpenAI model for embeddings
const azureOpenAIApiEmbeddingsDeploymentName= "text-embedding-ada-002";
const azureOpenAIEmbeddingsApiVersion= "2023-05-15";

// Azure OpenAI model for chat
const chatDeployment = "gpt-4o-mini"
const chatApiVersion = "2024-10-21";

export function createEmbeddingClient(): AzureOpenAIEmbeddings{

  const config = {
    azureOpenAIApiKey: azureOpenAIApiKey, 
    azureOpenAIApiInstanceName: azureOpenAIApiInstanceName, 
    azureOpenAIApiEmbeddingsDeploymentName: azureOpenAIApiEmbeddingsDeploymentName, 
    azureOpenAIApiVersion: azureOpenAIEmbeddingsApiVersion, 
    maxRetries: 1,
  };
  console.log("Embeddings client ", config);

  const embeddings = new AzureOpenAIEmbeddings(config);

  return embeddings;
}
export function getAzureChatOpenAI(temperature: number=0.3):AzureChatOpenAI{

  const chatConfig:AzureOpenAIInput={
    azureOpenAIApiKey: azureOpenAIApiKey, 
    azureOpenAIApiInstanceName: azureOpenAIApiInstanceName, 
    azureOpenAIApiDeploymentName: chatDeployment, 
    azureOpenAIApiVersion: chatApiVersion
  };
  console.log("Chat client ", chatConfig);

  const chatClient = new AzureChatOpenAI ({...chatConfig, model: chatConfig.azureOpenAIApiDeploymentName, temperature});
  return chatClient;
}

export async function getChatCompletions(
    chatClient:AzureChatOpenAI,
    messages:any[]
):Promise<any> 
{
    const completions = await chatClient.invoke(messages);

    return completions;
}