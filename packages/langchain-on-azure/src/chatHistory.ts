// npm install @langchain/openai @langchain/community @langchain/core
import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { AzureCosmsosDBNoSQLChatMessageHistory } from "@langchain/azure-cosmosdb";
import { CosmosClient, CosmosClientOptions } from "@azure/cosmos";

export default class ChatHistory {
  #client: CosmosClient;
  #sessionId: string;
  #userId: string;
  #sessionTitle: string;
  #databaseName: string;
  #containerName: string;
  #historyClient: AzureCosmsosDBNoSQLChatMessageHistory | null;

  constructor(cosmosClient: CosmosClient, sessionId: string, userId: string, sessionTitle: string, databaseName: string, containerName: string) {
    this.#client = cosmosClient;
    this.#sessionId = sessionId;
    this.#userId = userId;
    this.#sessionTitle = sessionTitle;
    this.#databaseName = databaseName;
    this.#containerName = containerName;
    this.#historyClient = null;
  }

  async init() {
    this.#historyClient = await this.createMessageHistoryClient();
    return this;
  }

  async addMessage(message: any) {
    if (this.#historyClient) {
      await this.#historyClient.addMessage(message);
    } else {
      throw new Error("History client is not initialized.");
    }
    return this;
  }

  async getMessages() {
    if (this.#historyClient) {
      return await this.#historyClient.getMessages();
    } else {
      throw new Error("History client is not initialized.");
    }
  }

  async clearHistory() {
    if (this.#historyClient) {
      await this.#historyClient.clear();
    } else {
      throw new Error("History client is not initialized.");
    }
    return this;
  }

  async createMessageHistoryClient() {
    const chatHistory = new AzureCosmsosDBNoSQLChatMessageHistory({
      client: this.#client,
      endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT,
      sessionId: this.#sessionId,
      userId: this.#userId,
      databaseName: this.#databaseName,
      containerName: this.#containerName,
    });

    return chatHistory;
  }

  static async createCosmosClientRBAC(): Promise<CosmosClient> {
    const credential: TokenCredential = new DefaultAzureCredential();

    const client = new CosmosClient({
      endpoint: process.env.AZURE_COSMOS_DB_ENDPOINT,
      aadCredentials: credential
    } as CosmosClientOptions);

    return client;
  }

  static async createCosmosClientConnectionString(): Promise<CosmosClient> {
    const connectionString = process.env.AZURE_COSMOS_DB_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error("AZURE_COSMOS_DB_CONNECTION_STRING environment variable is not set.");
    }

    const client = new CosmosClient(connectionString);

    return client;
  }
}