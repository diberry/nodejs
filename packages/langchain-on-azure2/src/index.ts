import 'dotenv/config'

import { createEmbeddingClient, getAzureChatOpenAI, getChatCompletions } from "./lib/azure-open-ai";
import { createAzureAiSearchVectorStoreFromDocuments, getSearchChain } from "./lib/azure-ai-search";
import { ChatPromptTemplate } from "@langchain/core/prompts";


import { loadTextFromFile } from "./lib/loaders";
import { createCombineDocsChainWrapper, createRetrievalChainWrapper } from './lib/chains';
const query = "What does Martin Luther King Jr. say about racial equality and freedom in his 'I Have a Dream' speech?";

async function main() {

    // Create embeddings client with specific embeddings model
    const embeddingsClient = createEmbeddingClient();

    // Test client by embedding a query
    const embeddings = await embeddingsClient.embedQuery("Hello, world!");
    console.log(embeddings);

    // Load document from file
    const documents = await loadTextFromFile("./files/i-have-a-dream.txt");

    // Create vector store with documents and embeddings client
    const vectorStoreClient = await createAzureAiSearchVectorStoreFromDocuments(
        documents,
        embeddingsClient
    );

    // Test vector store by performing similarity search
    const resultDocuments = await vectorStoreClient.similaritySearch(
        query
    );
    console.log("Similarity search results:");
    console.log(resultDocuments[0]);

    const chatClient = getAzureChatOpenAI();
    console.log("Chat client created");

    const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            "Answer the user's questions based on the below context:\n\n{context}",
        ],
        ["human", query],
    ]);
    console.log("Prompt messages created");

    const combineDocsChain = await createCombineDocsChainWrapper(chatClient, questionAnsweringPrompt);
    console.log("Combine docs chain created");

    const retrievalChain = await createRetrievalChainWrapper(vectorStoreClient, combineDocsChain);
    console.log("Retrieval chain created");

    const response = await retrievalChain.invoke({
        input: query,
    });

    console.log("Chain response:");
    console.log(response.answer);
}

main().catch(console.error);
