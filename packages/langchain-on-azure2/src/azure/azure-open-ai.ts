import { AzureOpenAIEmbeddings, AzureOpenAIInput, AzureChatOpenAI } from "@langchain/openai";

import 'dotenv/config'

// Azure OpenAI Instance - embedding
const azureOpenAIApiInstanceName= process.env.AZURE_OPENAI_EMBEDDING_INSTANCE;
const azureOpenAIApiKey= process.env.AZURE_OPENAI_EMBEDDING_KEY;
const embeddingDeployment= "text-embedding-ada-002";
const embeddingApiVersion= "2023-05-15";

// Azure OpenAI Instance - chat
const azureOpenAIApiChatInstanceName= process.env.AZURE_OPENAI_CHAT_INSTANCE;
const azureOpenAIApiChatKey= process.env.AZURE_OPENAI_CHAT_KEY;
const chatDeployment = "gpt-4o-mini";
const chatApiVersion = "2024-10-21";

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
export function getAzureChatOpenAI(temperature: number=0.3):AzureChatOpenAI{

  const chatConfig={
    azureOpenAIApiKey: azureOpenAIApiChatKey, 
    azureOpenAIApiInstanceName: azureOpenAIApiChatInstanceName, 
    azureOpenAIApiDeploymentName: chatDeployment, 
    azureOpenAIApiVersion: chatApiVersion
  };
  console.log("Chat client ", chatConfig);

  const chatClient = new AzureChatOpenAI (chatConfig);
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