# LangChain on Azure


LangChain is emerging as a powerful framework for developing autonomous, agentic applications. In this article, we deliver a complete, end-to-end solution that demonstrates how to build and deploy an intelligent agent integrated with Azure AI Search, Cosmos DB, and LangMem. Designed for students and mid-level developers new to AI and Azure, the sample includes full deployment details using the Azure Developer CLI command `azd up`, ensuring you can get started quickly and confidently.

You'll learn how to configure and initialize an agent using LangChain’s APIs, seamlessly connect it to Azure AI Search for semantic document retrieval, and employ adaptable prompt templates and execution logic to control behavior. The sample also covers the integration of a semantic cache using Cosmos DB, which stores previous query results and intermediate computations to speed up subsequent requests and improve overall responsiveness. We provide a dedicated section on robust error handling techniques—covering API errors and internal agent issues—to mitigate common pitfalls and reduce redundant calls to the search service.

Additionally, the article discusses LangMem, LangChain’s extended memory module, which is primarily designed for managing conversational state across interactions by preserving context over time. Even if you choose not to integrate LangMem, you'll benefit from a framework that hides repetitive or complex code, making it easier to build robust, scalable AI applications. The article concludes with a complete walkthrough of the code sample, detailed configuration steps, dependencies, and practical Azure integration tips, empowering you to extend or customize the solution for your own use cases.

- **Purpose of the Agent:**
  - The agent is set up to handle user queries by dynamically deciding whether to use its integrated tool—in this case, the Azure AI Search function—to fetch and aggregate information.
  - When a query (like “What is LangChain?”) is provided, the agent uses the search tool (which in turn queries the Azure Cognitive Search index) to gather relevant content from the ingested documents.

- **Why It’s an Agent Instead of a Direct Chain or OpenAI Call:**
  - **Dynamic Tool Selection:**  
    The agent follows a “zero-shot” approach (using the "zero-shot-react-description" agent type) which allows it to evaluate the input query and decide in real time whether or not to call a specific tool (i.e., the Azure AI Search function).
  - **Flexibility:**  
    The design lets you add additional tools or chains easily in the future, enabling the system to use different strategies based on the query.
  - **Enhanced Reasoning:**  
    Instead of sending the query directly to OpenAI, the agent can perform intermediate steps (like retrieving relevant documents) before composing the final answer. This makes the responses more informed by the actual data ingested into the vector store.
  - **Modular Integration:**  
    Using an agent abstracts the process of tool invocation, which is beneficial for complex workflows that require orchestration between content retrieval, validation, and natural language generation.

- **Tool Integration Overview:**
  - **AzureAI_Search Tool:**
    - Uses the LangChain retriever to query the Azure Cognitive Search index.
    - Retrieves relevant document content based on the query.
  - **Document_Summarizer Tool:**
    - Calls the AzureAI_Search tool internally to fetch documents.
    - Uses an OpenAI LLM to summarize the retrieved content, providing a concise overview.
  - **Document_Topic_Classifier Tool:**
    - Also relies on the AzureAI_Search tool to get content.
    - Uses an OpenAI LLM to extract and list the main topics present in the retrieved documents.

- **Impact on Agent Behavior:**
  - **Dynamic Tool Selection:**  
    The agent (configured with a "zero-shot-react-description" chain) can choose which tool to invoke based on the query context.  
    - For example, if a query implies a need for detailed exploration, it may choose the search tool; if a summary is desired, it opts for the summarization tool; and if topic extraction is helpful, it selects the topic classifier.
    
  - **Enhanced Responsiveness:**  
    The inclusion of different tools allows the agent to tailor its response more precisely:
    - It can provide full-document context,
    - Give a concise summary, or
    - Highlight key topics from the documents.
    
  - **Better Modularity and Flexibility:**  
    The separation into distinct tools means that each function (searching, summarizing, and classifying topics) can be improved or replaced independently. This modularity enhances overall system maintainability and scalability.
    
- **Overall Benefit:**  
  The combined approach enables a richer interaction with the ingested data in Azure Cognitive Search. Users can receive detailed search results, summarized insights, or a breakdown of document topics—all orchestrated dynamically by the agent.

**Prerequisites Before Using This File:**
- **Azure Setup:**
- Provision an Azure Cognitive Search instance.
- Create a corresponding search index with the expected schema (fields such as `id`, `content`, and `fileName`).
- **API Credentials:**
- Replace the placeholder values for `AZURE_SEARCH_SERVICE_ENDPOINT`, `AZURE_SEARCH_INDEX`, `AZURE_SEARCH_API_KEY`, and `YOUR_OPENAI_API_KEY` with actual credentials.
- **Dependencies:**
- Install required npm packages such as `langchain`, `@azure/search-documents`, and any specific document loader modules (e.g., for text and PDF).
- **Files:**
- Ensure the files to be ingested (e.g., a `.txt` file and a `.pdf` file) exist at the specified paths.


**Step-by-Step Overview:**
- **Imports and Configuration:**
- Imports necessary modules from LangChain (LLM, agents, retrievers, and document loaders) and the Azure Search SDK.
- Sets up Azure Cognitive Search configuration with the service endpoint, index name, and API key.
- **File Ingestion:**
- Iterates over an array of file paths (supports `.txt` and `.pdf` files).
- Uses LangChain’s `TextLoader` for `.txt` files and `PDFLoader` for `.pdf` files to load and extract document content.
- Constructs a document object that includes a unique `id` (derived from the file name without its extension), the file's content, and the file name.
- Collects all document objects into an array.
- **Document Upload:**
- Connects to Azure Cognitive Search using the Azure Search SDK (`SearchClient` with `AzureKeyCredential`).
- Uploads the collected documents to the specified Azure Search index.
- Logs the result of the upload operation.
- **Search Integration:**
- Defines a function (`azureAISearch`) that uses LangChain's Azure Cognitive Search Retriever to query the Azure index.
- Aggregates and returns the page content from the top 3 search results.
- **Agent Setup and Execution:**
- Creates a LangChain Tool that wraps the search integration function.
- Initializes an LLM (via OpenAI) and an agent executor that includes the Azure Search tool.
- Executes the agent with a sample query ("What is LangChain?") and logs the final result.


| Prompt                                                         | Tool Engaged                  | Description                                                                                                       |
|----------------------------------------------------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------|
| What is LangChain?                                             | AzureAI_Search                | Retrieves full document content related to LangChain from the Azure Cognitive Search index.                       |
| Summarize the key points about LangChain and its applications. | Document_Summarizer           | Fetches relevant documents and uses an LLM to provide a concise summary of the retrieved content.                  |
| What are the main topics covered in the discussion of LangChain? | Document_Topic_Classifier     | Extracts and lists the major topics from the documents returned by Azure AI Search, highlighting key subjects.     |

**Outcome After Execution:**
- The specified text and PDF documents are ingested (uploaded) into the Azure Cognitive Search index.
- A language model agent is initialized using the Azure Search tool.
- A sample query ("What is LangChain?") is executed against the uploaded Azure Search index.
- The final search results for the query, aggregated from the retrieved documents, are logged to the console.