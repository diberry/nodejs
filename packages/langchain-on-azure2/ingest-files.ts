import {
  AzureAISearchVectorStore,
  AzureAISearchQueryType,
} from "@langchain/community/vectorstores/azure_aisearch";

// Document loaders from LangChain for local files.
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from "path";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Document, BaseDocumentTransformer } from "@langchain/core/documents";

// Azure Cognitive Search configuration (replace placeholders)
const AZURE_SEARCH_SERVICE_ENDPOINT = "https://<your-search-service>.search.windows.net";
const AZURE_SEARCH_INDEX = "<your-index-name>";
const AZURE_SEARCH_API_KEY = "<your-azure-search-api-key>";

/**
 * Ingest files into Azure Cognitive Search.
 *
 * Uses LangChain document loaders to read content from files.
 *
 * Supported file types:
 * - .txt: Uses TextLoader.
 * - .pdf: Uses PDFLoader.
 *
 * For additional file types, add the appropriate loader logic.
 *
 * Ensure your Azure Search index schema includes fields:
 *    id, content, fileName
 */
export async function ingestFilesToAzureSearch(filePaths: string[]): Promise<void> {
  // Azure Cognitive Search configuration (replace placeholders)
  const serviceEndpoint = "https://<your-search-service>.search.windows.net";
  const indexName = "<your-index-name>";
  const apiKey = "<your-azure-search-api-key>";

  const credential = new AzureKeyCredential(apiKey);
  const client = new SearchClient(serviceEndpoint, indexName, credential);


  const documents: Document[]=[];
  let fileName: string;
  let content: string;

  for (const filePath of filePaths) {
    const ext = path.extname(filePath).toLowerCase();
    let rawDocs: any = undefined;
    let loader: TextLoader | PDFLoader | undefined = undefined;

    try {
      if (ext === ".txt") {
        // Use LangChain TextLoader
        loader = new TextLoader(filePath);

      } else if (ext === ".pdf") {
        // Use LangChain PDFLoader
        loader = new PDFLoader(filePath);
      } else {
        console.log(`Unsupported file type: ${ext} - skipping file ${filePath}`);
        continue;
      }
    } catch (error) {
      console.error(`Error loading file ${filePath}:`, error);
      continue;
    }
    if(loader){
      rawDocs = await loader.load();
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 0,
      });
      const docs = await splitter.splitDocuments(rawDocs);
      documents.push(...docs);
    }

  }

  if (documents.length === 0) {
    console.log("No documents to upload.");
    return;
  }

  // Upload documents to Azure Search.
  /* You don't need to change the call to `.fromDocuments` when using multiple tools. The vector store is created once from your documents, and all your tools can use that same underlying store for retrieval. Each tool (e.g., the search, summarization, and topic classification tools) simply uses its own retriever or LLM call on top of the indexed data.
  You don't need to pass the store back to the LangChain agents. The vector store is created once from your documents and serves as the underlying data repository for all retrieval operations. Each tool (such as your AzureAI_Search tool) is configured with the details of the Azure Cognitive Search index (e.g., service endpoint, index name, API key) and accesses the vector store through its own retriever or search configuration.
  In other words, when you call `.fromDocuments`, the store is built and remains available within the context of your search configuration. The agent and its tools simply use that configuration to query the index as needed, without requiring an explicit reference to the store to be passed around.
  */
  try {
    // Create Azure AI Search vector store
    await AzureAISearchVectorStore.fromDocuments(
      documents,
      new OpenAIEmbeddings(),
      {
        search: {
          type: AzureAISearchQueryType.SimilarityHybrid,
        },
      }
    );
  } catch (error) {
    console.error("Error uploading documents:", error);
  }
}