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
import { fstat } from "fs";
import { readFile } from "fs/promises";


export async function loadAndChunkDirectoryContents(
    dir: string,
    splitter: RecursiveCharacterTextSplitter) {
    const loader = new DirectoryLoader(dir, {
      '.md': (path) => new TextLoader(path),
    })
    console.log(`Loading documents from ${dir}`);
    const docs: Document<Record<string, any>>[] = await loader.load()

    // show document properties of first document
    //console.log(Object.getOwnPropertyNames(docs[0]));

    return await splitter.splitDocuments(docs);
  }
  export async function loadAndChunkContents(cheerioLoader: CheerioWebBaseLoader, splitter: RecursiveCharacterTextSplitter) {
    const docs = await cheerioLoader.load();
    return await splitter.splitDocuments(docs);
  }
  
  export async function indexChunks(vectorStore, allSplits: Document[]) {
    await vectorStore.addDocuments(allSplits);
  }
  
  export async function definePromptTemplate() {
    //https://smith.langchain.com/hub
    return await pull<ChatPromptTemplate>("rlm/rag-prompt");
  }
  export async function getUtf8FileContents(filePath: string) {
    console.log(`Reading file: ${filePath}`);
    const fileContents = await readFile(filePath, 'utf8');
    return fileContents;
    }

  export async function defineCustomPromptTemplate(systemPrompt: string) {

    const promptString = await getUtf8FileContents(systemPrompt);

    const chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", promptString],
      ]);

    return chatPrompt;
}
  
  export async function retrieve(vectorStore, state) {
    const retrievedDocs = await vectorStore.similaritySearch(state.question);
    return { context: retrievedDocs };
  }
  
  export async function generate(llm, state, promptTemplate: ChatPromptTemplate) {
    const docsContent = state.context.map(doc => doc.pageContent).join("\n");
    const messages = await promptTemplate.invoke({ question: state.question, context: docsContent });
    const response = await llm.invoke(messages);
    return { answer: response.content };
  }