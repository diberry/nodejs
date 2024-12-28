import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { Annotation, StateGraph } from "@langchain/langgraph";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import DocumentationManager from './documentation-manager.js';

const gitHubUrl = `https://github.com/microsoft/typespec`;

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0
});

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large"
});

const vectorStore = new MemoryVectorStore(embeddings);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000, chunkOverlap: 200
});

const InputStateAnnotation = Annotation.Root({
  question: Annotation<string>,
});

const StateAnnotation = Annotation.Root({
  question: Annotation<string>,
  context: Annotation<Document[]>,
  answer: Annotation<string>,
});

async function compileAndTestApplication() {

  const docManager = new DocumentationManager();

  console.log('Loading documents from GitHub repo...');
  const docs = await docManager.loadDocumentsFromGitHubRepo(gitHubUrl, 'main', true, 2);

  console.log('Splitting documents...');
  const splitDocs = await docManager.splitDocuments(docs);

  console.log('Embedding documents...');
  const vectorStore = await docManager.embedDocuments(splitDocs);

  console.log('Querying for relevant documents...');
  const results = await vectorStore?.similaritySearch("What is typespec?", 3);
  
  console.log(results);
}

compileAndTestApplication().catch(console.error);