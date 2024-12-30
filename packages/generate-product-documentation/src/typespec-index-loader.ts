import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {
  AzureAISearchVectorStore,
  AzureAISearchQueryType,
} from "@langchain/community/vectorstores/azure_aisearch";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { TextLoader } from "langchain/document_loaders/fs/text";


// Declare __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize LangChain
let ignoreFileExtensions = ['.json', '.mjs', '.ts'];

async function loadFiles(paths: string[]): Promise<string[]> {
  let docs:string[]=[];
  const stack = [...paths];
  
    while (stack.length) {
      const p = stack.pop();
      if (p) {
        const stats = await fs.stat(p);
  
        if (stats.isDirectory()) {
          const files = await fs.readdir(p);
          const subPaths = files.map((file) => path.join(p, file));
          stack.push(...subPaths);
        } else {

            // ignore files with these extensions
            if(!ignoreFileExtensions.includes(path.extname(p))) {
                //const splits:Document[] = await loadFile(p);
                console.log(`${p}`);
                docs.push(p);
            }
        }
      }
    }
  
    return docs;
  }

async function loadFile(filePath: string): Promise<Document[]> {
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const fileContents = await fs.readFile(filePath, "utf-8");
  console.log(`Loading file: ${filePath}`);
  // @ts-ignore
  return await splitter.createDocuments([fileContents]);
}

async function answerFromStore(
  store: AzureAISearchVectorStore, 
  question: string
) {
  const model = new ChatOpenAI({ model: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME });
  const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Answer the user's questions based on the below context:\n\n{context}",
    ],
    ["human", "{input}"],
  ]);

  const combineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt: questionAnsweringPrompt,
  });
  
  const chain = await createRetrievalChain({
    retriever: store.asRetriever(),
    combineDocsChain,
  });
  
  const response = await chain.invoke({
    input: question
  });
  return response;
}
async function createVectorStore(documents: Document[]): Promise<AzureAISearchVectorStore> {
  const store = await AzureAISearchVectorStore.fromDocuments(
    // @ts-ignore
    documents,
    new OpenAIEmbeddings(),
    {
      search: {
        type: AzureAISearchQueryType.SimilarityHybrid,
      },
    }
  );
  return store;
}

async function main() {
    
  const directoryPath = path.join(__dirname, '../', './docs/typespec-docs');
  console.log(`Loading documents from ${directoryPath}`);

  const documents: string[] = await loadFiles([directoryPath]);
  console.log(`Loaded ${documents.length} documents`);

  //if(documents.length === 0) return;

  //const vectorStore = await createVectorStore(documents);
  //console.log("Vector store created");

  //const response = await answerFromStore(vectorStore, "When should I use TypeSpec?");
  //console.log("Chain response:");
  //console.log(response.answer);

}

main().catch(console.error);

