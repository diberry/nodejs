import { AzureOpenAIEmbeddings } from "@langchain/openai";
import 'dotenv/config'

const key = process.env.AZURE_OPENAI_API_KEY;
const instance = process.env.AZURE_OPENAI_API_INSTANCE_NAME;
const deployment = process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME;
const version = process.env.AZURE_OPENAI_API_VERSION;

console.log({ key, instance, deployment, version });

const model = new AzureOpenAIEmbeddings({
    azureOpenAIApiKey: key,
    azureOpenAIApiInstanceName: instance,
    azureOpenAIApiEmbeddingsDeploymentName: deployment,
    azureOpenAIApiVersion: version
  });
const res = await model.embedQuery(
  "What would be a good company name for a company that makes colorful socks?"
);
console.log({ res });