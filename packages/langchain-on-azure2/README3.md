# LangChain on azure 

This solution architecture mimics Farzad Sunavala's data sources, tools, and agentic flow. 

3 Data sources: 
* Unstructured data in pdfs in Azure AI Search
* Structured preexisting data of stateful/historical information in Cosmos DB
* blocked - Real-time web search - Bing Search v7 has been replaced with AI Agent with Bing grounding - how does this integrate with framework orchestrators which have their own agentic implementation

## System prep - azd provision - provision posthook for data ingestion

Completed with Azure Developer CLI + Bicep.

* Scenario resources creates: 
    * Storage to hold PDFs
    * Cosmos DB to hold data
    * AI Search for vector store 
    * OpenAI for LLM
* PDFs are ingested into Azure AI Search vector store
* Data is uploaded to Cosmos DB

## Agentic flow
1. query
2. initialize tools - 3 tools
3. set max iterations through tools
4. agent rewrites query based on tools to be called
 
## System prompt
Your are a [role] assistant with access to three tools:
1) [toolname] look up historical private data from Cosmos DB
2) [toolname] search  for public unstructured docs from AI Search.
3) BLOCKED [toolname] web search for real-time public information with Bing Search.

You can call these tools in any order, multiple times if needed, to gather all the context.
Stop calling tools only when you have enough information to provide a final, cohesive answer.
Then output your final answer to the user.

## Hosting

- Functions runtime limited for max runtime - durable ?
- Better suited for container apps

## Evaluations

- Yohan - Langchain not great at evaluations
- Yohan uses https://www.promptfoo.dev/

## Tracing

- Yohan - LangChain - env variable to see all traces - debug flag to see all traces - 
- Yohan - Extend your own traces - to Azure OpenTelemetry - 

## LangChain and LangGraph integration

### AI Search vector store

LangChain community class is AzureAISearchVectorStore. 

From methods:
* fromDocuments
* fromTexts

To methods:
* toJSON
* toJSONNotImplemented

Add and delete methods:
* addDocuments
* addVectors
* delete

Retreiver methods:
* asRetriever

Search methods:

* **similaritySearch** - *** - showcase different options - semantic ranker with hybrid search


* maxMarginalRelevanceSearch - *** - built in reranking - not recommended for AI Search - there for compatibility with other integration
* hybridSearchVectorWithScore
* semanticHybridSearchVectorWithScore
* similaritySearchVectorWithScore
* similaritySearchWithScore

Yohan - PDF loader 3rd data - 
schema - open discussion - use specific keys for content and metadata - abstraction with default schema - uses smart default for content - 

if you had geographic data and wanted to index it differently
or metadata that you wanted to search these extra fields


#### Load unstructured documents into Azure Search AI with default schema

[Load documents from file](https://js.langchain.com/docs/integrations/vectorstores/azure_aisearch/)

```javascript
// Load documents from file
const loader = new TextLoader("./state_of_the_union.txt");
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
```

#### Similarty search

[Similarity search](https://js.langchain.com/docs/integrations/vectorstores/azure_aisearch/)

```javascript
// Performs a similarity search
const resultDocuments = await store.similaritySearch(
  "What did the president say about Ketanji Brown Jackson?"
);

console.log("Similarity search results:");
console.log(resultDocuments[0].pageContent);
```

#### Use vector store as retriever

```javascript
const countOfDocuments = 1
const retriever = store.asRetriever(countOfDocuments);

// Retrieve the most similar text
const retrievedDocuments = await retriever.invoke("What is LangChain?");

retrievedDocuments[0].pageContent;
```


#### Use vector store as part of chain

[Use in chain](https://js.langchain.com/docs/integrations/vectorstores/azure_aisearch/)

```javascript
const llm = new AzureOpenAI({ 
    model: "gpt-3.5-turbo-1106",
    azureOpenAIApiKey: "<your_key>", // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
    azureOpenAIApiInstanceName: "<your_instance_name>", // In Node.js defaults to process.env.AZURE_OPENAI_API_INSTANCE_NAME
    azureOpenAIApiDeploymentName: "<your_deployment_name>", // In Node.js defaults to process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
    azureOpenAIApiVersion: "<api_version>", // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
    temperature: 0,
    maxTokens: undefined,
    timeout: undefined,
    maxRetries: 2
});
const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Answer the user's questions based on the below context:\n\n{context}",
  ],
  ["human", "{input}"],
]);

const combineDocsChain = await createStuffDocumentsChain({
  llm,
  prompt: questionAnsweringPrompt,
});

// Azure AI Search as retriever
const chain = await createRetrievalChain({
  retriever: store.asRetriever(),
  combineDocsChain,
});

const response = await chain.invoke({
  input: "What is the president's top priority regarding prices?",
});

console.log("Chain response:");
console.log(response.answer);
```

#### Tool to query Azure AI Search vector store

Tool

```javascript
import { Tool } from "langchain/tools"; 
import { AzureAISearchVectorStore } from "langchain/vectorstores/azure_aisearch";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// Assume that you have already loaded your documents and created your vector store.
// For example, you might have created your vector store like this:
// const documents = await splitter.splitDocuments(rawDocuments);
// const store = await AzureAISearchVectorStore.fromDocuments(
//   documents,
//   new OpenAIEmbeddings(),
//   { search: { type: "SimilarityHybrid" } }
// );

// If your store is created elsewhere, import or pass it in.
let store; // This should be your initialized AzureAISearchVectorStore

/**
 * Function that queries the vector store and returns concatenated page content of retrieved documents.
 * @param {string} query - User query to search within the vector store.
 * @returns {Promise<string>} - Combined page content of matched documents.
 */
export async function queryVectorStore(query) {
  if (!store) {
    throw new Error("Vector store is not initialized.");
  }
  // Create a retriever from the vector store, you can pass parameters (e.g., number of documents)
  const retriever = store.asRetriever({ count: 3 });
  const retrievedDocuments = await retriever.invoke(query);
  // For simplicity, join the page content of returned documents
  return retrievedDocuments.map(doc => doc.pageContent).join("\n---\n");
}

// Wrap the function as a LangChain Tool so that it can be used as part of an agent's graph.
export const vectorStoreTool = new Tool({
  name: "VectorStoreQuery",
  description:
    "Searches the Azure AI Search vector store for relevant context based on the user input.",
  func: queryVectorStore,
});
```

Call tool in an agent

```javascript
import { AgentExecutor } from "langchain/agents";
import { vectorStoreTool } from "./vectorStoreTool";
import { AzureOpenAI } from "langchain/llms/azure_openai";

// Instantiate your LLM (with proper environment variable configuration)
const llm = new AzureOpenAI({
  model: "gpt-3.5-turbo-1106",
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
  maxRetries: 2,
  temperature: 0,
});

// Create an agent with the vectorStoreTool (and any other tools you have).
const tools = [vectorStoreTool /*, ...other tools */];

// Create the agent executor graph.
const agentExecutor = AgentExecutor.fromLLMAndTools(llm, tools);

// Now use the agent to handle a query.
const response = await agentExecutor.invoke({
  input: "What does LangChain do?",
});

console.log("Agent response:", response);
```

### Azure OpenAI

LangChain class is [AzureOpenAI](https://v03.api.js.langchain.com/classes/_langchain_openai.AzureOpenAI.html#metadata). 

- asTool
- invoke
- withStructuredOutput?
- isRunnable
- assign
- batch
- bind
- call
- completionWithRetry
- generate
- generatePrompt
- getGraph
- getName
- getNumTokens
- identifyingParams
- invocationParams
- map
- pick
- pipe
- predict
- predictMessages
- serialize
- stream
- streamEvents
- streamLog
- toJSON
- toJSONNotImplemented
- transform
- withConfig
- withFallbacks
- withListeners
- withRetry
- withStructuredOutput?
- deserialize
- isRunnable



#### Use Azure OpenAI deployment model to get completion

````javascript
const llm = new AzureOpenAI({ 
    model: "gpt-3.5-turbo-1106",
    azureOpenAIApiKey: "<your_key>", // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
    azureOpenAIApiInstanceName: "<your_instance_name>", // In Node.js defaults to process.env.AZURE_OPENAI_API_INSTANCE_NAME
    azureOpenAIApiDeploymentName: "<your_deployment_name>", // In Node.js defaults to process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
    azureOpenAIApiVersion: "<api_version>", // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
    temperature: 0,
    maxTokens: undefined,
    timeout: undefined,
    maxRetries: 2
});

const inputText = "AzureOpenAI is an AI company that ";

const completion = await llm.invoke(inputText);
completion;
````

#### Chaining

```javascript
import { PromptTemplate } from "@langchain/core/prompts";

const prompt = new PromptTemplate({
  template: "How to say {input} in {output_language}:\n",
  inputVariables: ["input", "output_language"],
});

const chain = prompt.pipe(llm);
await chain.invoke({
  output_language: "German",
  input: "I love programming.",
});
```

#### Evaluations with Foundry

#### Tracing with Foundry

