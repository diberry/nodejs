import fetch from 'node-fetch';

import type {

  MessageTextContentOutput,
} from "@azure/ai-projects";
import {
  connectionToolType,
  AIProjectsClient,
  DoneEvent,
  ErrorEvent,
  isOutputOfType,
  MessageStreamEvent,
  RunStreamEvent,
  ToolUtility,
} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";
const deployment = process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME!;
const client = AIProjectsClient.fromConnectionString(
  connectionString || "",
  new DefaultAzureCredential(),
);

async function main() {

  const bingGroundingConnectionId = "<bingGroundingConnectionId>";
  const bingTool = ToolUtility.createConnectionTool(connectionToolType.BingGrounding, [
    bingGroundingConnectionId,
  ]);

  const agent = await client.agents.createAgent(deployment, {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [bingTool.definition],
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // create a thread
  const thread = await client.agents.createThread();

  // add a message to thread
  await client.agents.createMessage(
    thread.id, {
    role: "user",
    content: "What is the weather in Seattle?",
  });

  // create a run
  const streamEventMessages = await client.agents.createRun(thread.id, agent.id).stream();

  for await (const eventMessage of streamEventMessages) {
    switch (eventMessage.event) {
      case RunStreamEvent.ThreadRunCreated:
        break;
      case MessageStreamEvent.ThreadMessageDelta:
        {
          const messageDelta = eventMessage.data;
          messageDelta?.delta.content.forEach((contentPart:any) => {
            if (contentPart.type === "text") {
              const textContent = contentPart;
              const textValue = textContent.text?.value || "No text";
            }
          });
        }
        break;

      case RunStreamEvent.ThreadRunCompleted:
        break;
      case ErrorEvent.Error:
        console.log(`An error occurred. Data ${eventMessage.data}`);
        break;
      case DoneEvent.Done:
        break;
    }
  }

  // Print the messages from the agent
  const messages = await client.agents.listMessages(thread.id);

  // Messages iterate from oldest to newest
  // messages[0] is the most recent
  for (let i = messages.data.length - 1; i >= 0; i--) {
    const m = messages.data[i];
    if (isOutputOfType<MessageTextContentOutput>(m.content[0], "text")) {
      const textContent = m.content[0];
      console.log(`${textContent.text.value}`);
      console.log(`---------------------------------`);
    }
  }
}