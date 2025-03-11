
import 'dotenv/config'

import { createEmbeddingClient, AzureOpenAIEmbeddingsOptions } from "./lib/create-embedding";
import { createVectorStoreFromDocuments } from "./lib/create-vector-store";

const azureOpenAIApiEmbeddingsDeploymentName= process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME;
const azureOpenAIApiInstanceName= process.env.AZURE_OPENAI_API_INSTANCE_NAME;
const azureOpenAIApiKey= process.env.AZURE_OPENAI_API_KEY;
const azureOpenAIEmbeddingsApiVersion= process.env.EMBEDDING_API_VERSION;
//const azureOpenAIBasePath= process.env.AZURE_OPENAI_API_BASE_PATH;

async function main() {

    const embeddingsOptions: AzureOpenAIEmbeddingsOptions = {
        azureOpenAIApiInstanceName: azureOpenAIApiInstanceName,
        azureOpenAIApiDeploymentName: azureOpenAIApiEmbeddingsDeploymentName,
        azureOpenAIApiKey: azureOpenAIApiKey,
        azureOpenAIApiVersion: azureOpenAIEmbeddingsApiVersion
    }


    const embeddingsClient = createEmbeddingClient(embeddingsOptions);
    const embeddings = await embeddingsClient.embedQuery("Hello, world!");
    console.log(embeddings);


}

main().catch(console.error);
