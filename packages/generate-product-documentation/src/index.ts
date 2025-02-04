import "cheerio";
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

import {
  loadAndChunkDirectoryContents,
  indexChunks,
  definePromptTemplate,
  defineCustomPromptTemplate,
  getUtf8FileContents
} from "./utils.js";

import 'dotenv/config';

const userPromptFile = "src/docs/user_prompt.md";
const systemPromptFile = "src/docs/system_prompt.md";
const engineeringFileDir = "src/docs/engineering";
const writingFileDir = "src/docs/writing";
const templatesFileDir = "src/docs/content_templates";


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

  const engSplits = await loadAndChunkDirectoryContents(engineeringFileDir, splitter);
  const writingSplits = await loadAndChunkDirectoryContents(writingFileDir, splitter);
  const templates = await loadAndChunkDirectoryContents(templatesFileDir, splitter);

  await indexChunks(vectorStore, engSplits);
  await indexChunks(vectorStore, writingSplits);
  await indexChunks(vectorStore, templates);

  const promptTemplate = await defineCustomPromptTemplate(systemPromptFile);

  const retrieve = async (state: typeof InputStateAnnotation.State) => {
    const retrievedDocs = await vectorStore.similaritySearch(state.question)
    return { context: retrievedDocs };
  };
  const generate = async (state: typeof StateAnnotation.State) => {
    const docsContent = state.context.map(doc => doc.pageContent).join("\n");
    const messages = await promptTemplate.invoke({ question: state.question, context: docsContent });
    const response = await llm.invoke(messages);
    return { answer: response.content };
  };

  const graph = new StateGraph(StateAnnotation)
  .addNode("retrieve", retrieve)
  .addNode("generate", generate)
  .addEdge("__start__", "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("generate", "__end__")
  .compile();

  const userPrompt = await getUtf8FileContents(userPromptFile);

  let inputs = { question: userPrompt };
  const result = await graph.invoke(inputs);
  console.log(result.answer);
}

compileAndTestApplication().catch(console.error);