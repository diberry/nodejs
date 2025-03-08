// agent.ts
//https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/#making-your-first-agent-using-langgraph
import 'dotenv/config'
// IMPORTANT - Add your API keys here. Be careful not to publish them.

import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { AzureChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

// Define the tools for the agent to use
const agentTools = [new TavilySearchResults({ maxResults: 3 })];
const agentModel = new AzureChatOpenAI({
  temperature: 0.7,
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
  azureOpenAIEndpoint: process.env.AZURE_OPENAI_API_ENDPOINT,
});



// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});

// Wrap the async work in an async main function
async function main() {
  try {
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
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main().catch((error) => console.error("Unhandled error:", error));