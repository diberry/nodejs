import { CosmosClient } from "@azure/cosmos";
import ChatHistory from "../src/chatHistory";
import { describe, beforeAll, test, expect } from 'vitest';

describe("ChatHistory", () => {
  const sessionId = "test-session-id";
  const userId = "test-user-id";
  const sessionTitle = "test-session-title";
  const databaseName = "test-database";
  const containerName = "test-container";

  let cosmosClient: CosmosClient;
  let chatHistory: ChatHistory;

  beforeAll(async () => {
    // Create a CosmosClient instance using connection string
    cosmosClient = await ChatHistory.createCosmosClientConnectionString();
    chatHistory = new ChatHistory(cosmosClient, sessionId, userId, sessionTitle, databaseName, containerName);
    await chatHistory.init();
  });

  test("should add a message", async () => {
    await chatHistory.addMessage({ content: "Hello, world!" });
    const messages = await chatHistory.getMessages();
    expect(messages).toContainEqual(expect.objectContaining({ content: "Hello, world!" }));
  });

  test("should get all messages", async () => {
    await chatHistory.addMessage({ content: "Message 1" });
    await chatHistory.addMessage({ content: "Message 2" });
    const messages = await chatHistory.getMessages();
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ content: "Message 1" }),
        expect.objectContaining({ content: "Message 2" }),
      ])
    );
  });

  test("should clear history", async () => {
    await chatHistory.clearHistory();
    const messages = await chatHistory.getMessages();
    expect(messages).toEqual([]);
  });
});