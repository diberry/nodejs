import fs from 'fs/promises';
import path from 'path';
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Client, ClientOptions } from "@elastic/elasticsearch";
import {
    ElasticClientArgs,
    ElasticVectorSearch,
  } from "@langchain/community/vectorstores/elasticsearch";

export interface DocSetMetadata{
  name?: string;
  category?: string;
  scenario?: string;
}

export interface DocSet {
  path: string;
  metadata?: DocSetMetadata;
}

interface Document {
  content: string;
  metadata: Record<string, string>;
}
interface DocumentationConfiguration{
    docSet: DocSet[],
    gitHubUrl: string,
    docType: 'LOCAL' | 'GITHUB',
    vectorStoreType: 'MEMORY' | 'ELASTICSEARCH',
  }

function isGithubUrl(variable: any): boolean {
    return typeof variable === 'string' && variable.length > 0 && variable.startsWith('https://github.com/');
}
function isArrayofStrings(variable: any): boolean {
    return Array.isArray(variable) && variable.every(item => typeof item === 'string');
}

class DocumentationManager {
  private docSet: DocSet[] = [];
  private embeddings: OpenAIEmbeddings;
  private vectorStore: MemoryVectorStore | null = null;
  private documents: Document[] = [];
  private splitDocs: Document[] = [];

  constructor() {
    this.embeddings = new OpenAIEmbeddings();
  }


  public async init(config: DocumentationConfiguration) {

    switch (config.docType) {
        case 'LOCAL':
            if (isArrayofStrings(config.docSet)) {
                this.docSet = config.docSet;
                const docPaths = config.docSet.map(doc => doc.path);
                
                console.log(docPaths);
                
                this.documents = await this.loadDocuments(docPaths);
                this.splitDocs = this.splitDocuments(this.documents);
                //this.embedDocuments(this.splitDocs);
            } else {
                throw new Error("DocumentationManager::init - Invalid docSet for LOCAL docType");
            }
            break;
        case 'GITHUB':
            if (isGithubUrl(config.gitHubUrl)) {
                // Add your GITHUB handling logic here
            } else {
                throw new Error("DocumentationManager::init - Invalid gitHubUrl for GITHUB docType");
            }
            break;
        default:
            throw new Error("DocumentationManager::init - Invalid docType. Must be 'LOCAL' or 'GITHUB'");
    }


  }

    public get getDocSet(): DocSet[] {
        return this.docSet;
    }
    
    public get getEmbeddings(): OpenAIEmbeddings {
        return this.embeddings;
    }
    
    public get getVectorStore(): MemoryVectorStore | null {
        return this.vectorStore;
    }
    
    public get getDocuments(): Document[] {
        return this.documents;
    }
    
    public get getSplitDocs(): Document[] {
        return this.splitDocs;
    }


  /**
   * Recursively reads all files in given directories and loads them as documents.
   * @param paths Array of file or directory paths.
   */
  private async loadDocuments(paths: string[]): Promise<Document[]> {
    const documents: Document[] = [];

    for (const p of paths) {
      const stats = await fs.stat(p);

      if (stats.isDirectory()) {
        const files = await fs.readdir(p);
        const subPaths = files.map(file => path.join(p, file));
        documents.push(...(await this.loadDocuments(subPaths)));
      } else if (stats.isFile() && p.endsWith('.md')) {
        const content = await fs.readFile(p, 'utf-8');

        const metadata = this.docSet.find(doc => doc.path === p)?.metadata || {};

        documents.push({
          content,
          metadata: { path: p, ...metadata },
        });
      }
    }

    return documents;
  }



  /**
   * Splits documents into smaller chunks for embedding.
   * @param documents Array of documents to split.
   */
  private splitDocuments(documents: Document[]): Document[] {
    const chunkSize = 1000; // Example chunk size
    const splitDocs: Document[] = [];

    for (const doc of documents) {
      const { content, metadata } = doc;
      for (let i = 0; i < content.length; i += chunkSize) {
        splitDocs.push({
          content: content.slice(i, i + chunkSize),
          metadata,
        });
      }
    }

    return splitDocs;
  }

  /**
   * Embeds documents and stores them in a vector store.
   * @param documents Array of documents to embed.
   */
  private async embedMemoryDocuments(documents: Document[]): Promise<MemoryVectorStore | null> {
    const texts = documents.map(doc => doc.content);

    // metadata includes path, name, category, scenario
    const metadatas = documents.map(doc => doc.metadata);

    this.vectorStore = await MemoryVectorStore.fromTexts(texts, metadatas, this.embeddings);
    return this.vectorStore;
  }
  private async embedElasticsearchDocuments(documents: Document[]): Promise<MemoryVectorStore | null> {
    const texts = documents.map(doc => doc.content);

    // metadata includes path, name, category, scenario
    const metadatas = documents.map(doc => doc.metadata);

    const clientArgs: ElasticClientArgs = {
        client: new Client(config),
        indexName: process.env.ELASTIC_INDEX ?? "test_vectorstore",
      };

    this.vectorStore = await MemoryVectorStore.fromTexts(texts, metadatas, this.embeddings, client);
    return this.vectorStore;
  }

  /**
   * Retrieves the most relevant documents based on a query.
   * @param query The input query string.
   * @param k Number of results to return.
   */
  public async retrieveDocuments(query: string, k = 3, filter?: any): Promise<Document[]> {
    if (!this.vectorStore) {
      throw new Error('Vector store is not initialized. Please embed documents first.');
    }

      const results = await this.vectorStore.similaritySearch(query, k, filter);
      return results.map(result => ({
        content: result.pageContent,
        metadata: result.metadata,
      }));
    }
}

export default DocumentationManager;