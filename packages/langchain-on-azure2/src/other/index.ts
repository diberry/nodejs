import 'dotenv/config'
import { tool } from "@langchain/core/tools";
import { createEmbeddingClient, getAzureChatOpenAI, getChatCompletions } from "../lib/azure-open-ai";
import { createAzureAiSearchVectorStoreFromDocuments, getSearchChain } from "../lib/azure-ai-search";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

import { loadTextFromFile } from "../lib/loaders";
import { createCombineDocsChainWrapper, createRetrievalChainWrapper } from '../lib/chains';

import { getVectorStoreDocumentsFromQueryTool } from "../lib/tool-azure-ai-search-2";




const query = "What does Martin Luther King Jr. say are the harms to racial equality and freedom in his 'I Have a Dream' speech?";
const query2 = "What actions are needed to achieve racial equality and freedom according to Martin Luther King Jr. in his 'I Have a Dream' speech?";

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
        ["human", query2],
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



    //const vectorStoreTool = getVectorStoreDocumentsFromQueryTool;


    // Initialize memory to persist state between graph runs
    // const agentCheckpointer = new MemorySaver();
    // const agent = createReactAgent({
    // llm: getAzureChatOpenAI(0),
    // tools: agentTools,
    // checkpointSaver: agentCheckpointer,
    // });

}

main().catch(console.error);
