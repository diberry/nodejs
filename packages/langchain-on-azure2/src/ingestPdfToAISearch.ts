import {
    AzureAISearchVectorStore,
    AzureAISearchQueryType,
  } from "@langchain/community/vectorstores/azure_aisearch";
  import { ChatPromptTemplate } from "@langchain/core/prompts";
  import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
  import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
  import { createRetrievalChain } from "langchain/chains/retrieval";
  import { TextLoader } from "langchain/document_loaders/fs/text";
  import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
  import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
  import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
  import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
  import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
async function ingestFilesToAISearch(relativeDirectoryPath: string) {

// https://js.langchain.com/docs/integrations/document_loaders/file_loaders/directory/
// https://js.langchain.com/docs/integrations/document_loaders/file_loaders/pdf/
// https://js.langchain.com/docs/integrations/document_loaders/file_loaders/docx/
const loader = new DirectoryLoader(relativeDirectoryPath,
{
    //".txt": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
    //".pptx": (path) => new PPTXLoader(path),
    //".docx": (path) => new DocxLoader(path)
});

const rawDocuments = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 0,
});
const documents = await splitter.splitDocuments(rawDocuments);

// Create Azure AI Search vector store
const store = await AzureAISearchVectorStore.fromDocuments(
  documents,
  new OpenAIEmbeddings(),
  {
    search: {
      type: AzureAISearchQueryType.SimilarityHybrid,
    },
  }
);
}