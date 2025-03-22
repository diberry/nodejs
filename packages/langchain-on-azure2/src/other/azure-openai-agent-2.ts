import { AzureOpenAIEmbeddings, AzureOpenAIInput, AzureChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createEmbeddingClient, getAzureChatOpenAI, getChatCompletions } from "../lib/azure-open-ai";
import { createAzureAiSearchVectorStoreFromDocuments, getSearchChain, getQueryTool } from "../lib/azure-ai-search";
import { loadTextFromFile } from "../lib/loaders";
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { AIMessage } from '@langchain/core/messages';
import 'dotenv/config'

// Azure OpenAI Instance - chat
const azureOpenAIApiChatInstanceName = process.env.AZURE_OPENAI_CHAT_INSTANCE;
const azureOpenAIApiChatKey = process.env.AZURE_OPENAI_CHAT_KEY;
const chatDeployment = "gpt-4o-mini";
const chatApiVersion = "2024-10-21";



async function main() {

    // Define the tools for the agent to use
    //const agentTools = [new TavilySearchResults({ maxResults: 3 })];

// Create embeddings client with specific embeddings model
    const embeddingsClient = createEmbeddingClient();

    // Test client by embedding a query
    //const embeddings = await embeddingsClient.embedQuery("Hello, world!");
    //console.log(embeddings);

    // Load document from file
    const documents = await loadTextFromFile("./files/i-have-a-dream.txt");

    // Create vector store with documents and embeddings client
    const vectorStoreClient = await createAzureAiSearchVectorStoreFromDocuments(
        documents,
        embeddingsClient
    );

    const azureChatModel = new AzureChatOpenAI({
        azureOpenAIApiKey: azureOpenAIApiChatKey,
        azureOpenAIApiInstanceName: azureOpenAIApiChatInstanceName,
        azureOpenAIApiDeploymentName: chatDeployment,
        azureOpenAIApiVersion: chatApiVersion,
        temperature: 0,
        timeout: 10000

    });
    console.log("create chat model");

    const retriever = vectorStoreClient.asRetriever(1);
    console.log("create retreiver");

    const vectorStoreTool = tool(async (input) => {
        return retriever.invoke(input.query)
      }, {
        name: 'get_docs',
        description: 'Call to get the docs for query.',
        schema: z.object({
          query: z.string().describe("User query."),
        })
      })
    console.log("create retriever tool");

    // Initialize memory to persist state between graph runs
    const agentCheckpointer = new MemorySaver();
    console.log("create checkpointer");

    const agent = createReactAgent({
        llm: azureChatModel,
        tools: [vectorStoreTool],
        checkpointSaver: agentCheckpointer,
    });
    console.log("create agent");

    // Now it's time to use!
    const agentFinalState = await agent.invoke(
        { messages: [new HumanMessage("what was the message of the I Have a dream speechh")] },
        { configurable: { thread_id: "42" } },
    );
    console.log("Invoke agent",
        agentFinalState.messages[agentFinalState.messages.length - 1].content,
    );

    // const agentNextState = await agent.invoke(
    //     { messages: [new HumanMessage("Was there a second messaage")] },
    //     { configurable: { thread_id: "42" } },
    // );

    // console.log("Invoke agent",
    //     agentNextState.messages[agentNextState.messages.length - 1].content,
    // );
}
main().catch(console.error);