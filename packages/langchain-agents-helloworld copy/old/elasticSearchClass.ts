import { Client, ClientOptions } from "@elastic/elasticsearch";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { VectorDBQAChain } from "langchain/chains";
import {
  ElasticClientArgs,
  ElasticVectorSearch,
} from "@langchain/community/vectorstores/elasticsearch";
import { Document } from "@langchain/core/documents";

export interface ElasticsearchConfig {
  elasticUrl?: string;
  apiKey?: string;
  username?: string;
  password?: string;
  indexName?: string;
}

export default class ElasticsearchService {
  private client: Client;
  private indexName: string;
  private vectorStore: ElasticVectorSearch|null=null;

  constructor(config: ElasticsearchConfig) {
    const clientOptions: ClientOptions = {
      node: config.elasticUrl ?? "http://127.0.0.1:9200",
    };
    if (config.apiKey) {
      clientOptions.auth = {
        apiKey: config.apiKey,
      };
    } else if (config.username && config.password) {
      clientOptions.auth = {
        username: config.username,
        password: config.password,
      };
    }
    this.client = new Client(clientOptions);
    this.indexName = config.indexName ?? "test_vectorstore";
  }

  async initializeVectorStore(docs: Document[], embeddings: OpenAIEmbeddings) {
    const clientArgs: ElasticClientArgs = {
      client: this.client,
      indexName: this.indexName,
    };
    this.vectorStore = new ElasticVectorSearch(embeddings, clientArgs);
    await this.vectorStore.addDocuments(docs);
  }

  async search(query: string, k: number) {
    return await this.vectorStore.similaritySearch(query, k);
  }

  async deleteDocuments(ids: string[]) {
    if(this.vectorStore !== null) {
      await this.vectorStore.delete({ ids });
    }
  }

  async runChain(query: string) {
    const model = new OpenAI();
    const chain = VectorDBQAChain.fromLLM(model, this.vectorStore, {
      k: 1,
      returnSourceDocuments: true,
    });
    return await chain.invoke({ query });
  }
}
