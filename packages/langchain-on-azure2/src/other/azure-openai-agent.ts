import { AzureOpenAIEmbeddings, AzureOpenAIInput, AzureChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

import 'dotenv/config'

// Azure OpenAI Instance - chat
const azureOpenAIApiChatInstanceName = process.env.AZURE_OPENAI_CHAT_INSTANCE;
const azureOpenAIApiChatKey = process.env.AZURE_OPENAI_CHAT_KEY;
const chatDeployment = "gpt-4o-mini";
const chatApiVersion = "2024-10-21";

async function main() {

    // Define the tools for the agent to use
    const agentTools = [new TavilySearchResults({ maxResults: 3 })]; // Real time search
    const agentModel = new AzureChatOpenAI({
        azureOpenAIApiKey: azureOpenAIApiChatKey,
        azureOpenAIApiInstanceName: azureOpenAIApiChatInstanceName,
        azureOpenAIApiDeploymentName: chatDeployment,
        azureOpenAIApiVersion: chatApiVersion,
        temperature: 0
    });

    // Initialize memory to persist state between graph runs
    const agentCheckpointer = new MemorySaver();
    const agent = createReactAgent({
        llm: agentModel,
        tools: agentTools,
        checkpointSaver: agentCheckpointer,
    });

    // Now it's time to use!
    const agentFinalState = await agent.invoke(
        { messages: [new HumanMessage("what is the current weather in sf")] },
        { configurable: { thread_id: "42" } },
    );

    console.log(
        agentFinalState.messages[agentFinalState.messages.length - 1].content,
    );

    const agentNextState = await agent.invoke(
        { messages: [new HumanMessage("what about ny")] },
        { configurable: { thread_id: "42" } },
    );

    console.log(
        agentNextState.messages[agentNextState.messages.length - 1].content,
    );
}
main().catch(console.error);