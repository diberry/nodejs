# LangChain on Azure

LangChain is emerging as a powerful framework for developing autonomous, agentic applications. In this article, we deliver a complete, end-to-end solution that demonstrates how to build and deploy an intelligent agent integrated with Azure AI Search, Cosmos DB, and LangMem. Designed for students and mid-level developers new to AI and Azure, the sample includes full deployment details using the Azure Developer CLI (`azd up`), ensuring you can get started quickly and confidently.

The solution enables dynamic tool selection so that the agent can either retrieve detailed document content, generate concise summaries, or extract key topics from documents—depending on the query.

## Overview

The solution integrates multiple components to provide a richer interaction with the ingested data:
  
- **Dynamic Tool Selection:**  
  Instead of a direct call to an OpenAI model, the agent uses a "zero-shot-react-description" approach to evaluate the input query and dynamically decide the best tool to use. It can:
  - Retrieve full document content via the **AzureAI_Search** tool.
  - Generate a concise summary using the **Document_Summarizer** tool.
  - Extract topics with the **Document_Topic_Classifier** tool.

Each tool leverages Azure Cognitive Search to gather relevant documents, and then OpenAI LLMs process and transform that content as needed.

## Prerequisites

Before running this solution, you must ensure that:

- **Azure Setup:**  
  - You have provisioned an Azure Cognitive Search instance.
  - You created a corresponding search index with the expected schema, including fields such as `id`, `content`, and `fileName`.

- **API Credentials:**  
  - All placeholder values for `AZURE_SEARCH_SERVICE_ENDPOINT`, `AZURE_SEARCH_INDEX`, `AZURE_SEARCH_API_KEY`, and `YOUR_OPENAI_API_KEY` are replaced with your actual credentials.

- **Dependencies:**  
  - Required npm packages such as `langchain`, `@azure/search-documents`, along with any necessary document loader modules (for text and PDF), are installed.

- **Files:**  
  - The files to be ingested (for example, a `.txt` file and a `.pdf` file) exist at their specified paths.

## Implementation Steps

**Imports and Configuration:**  
The solution starts by importing the necessary modules from LangChain and the Azure Search SDK. The Azure Cognitive Search settings, including the endpoint, index name, and API key, are defined here.

**File Ingestion and Document Upload:**  
The solution iterates over a list of file paths, using LangChain's `TextLoader` for `.txt` files and `PDFLoader` for `.pdf` files to extract content. It then constructs document objects that include a unique `id`, the file's content, and the file name. These documents are subsequently uploaded to the Azure Cognitive Search index using the Azure Search SDK.

**Tool Integration and Agent Setup:**  
Three key tools are integrated:
  
- **AzureAI_Search Tool**  
  Queries the Azure Cognitive Search index via the LangChain retriever to return full document content.

- **Document_Summarizer Tool**  
  Uses the output of the search tool and an OpenAI LLM to create a concise summary of the retrieved documents.

- **Document_Topic_Classifier Tool**  
  Leverages the search function and an OpenAI LLM to extract and list the main topics from the documents.

An agent is then initialized using these tools. The agent's dynamic selection capability means that, based on the query, it can choose the most appropriate tool to provide the best response.

**Agent Execution:**  
A sample query such as “What is LangChain?” is run through the agent. Based on the context of the query, the agent determines whether to provide full document search results, a summary, or a topic breakdown, and the aggregated result is then output to the console.

## Example Prompts

Below is a table showing example prompts and the tool they are designed to engage:

| **Prompt**                                                         | **Tool Engaged**              | **Description**                                                                                                   |
|--------------------------------------------------------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------|
| What is LangChain?                                                 | AzureAI_Search                | Retrieves full document content related to LangChain from the Azure Cognitive Search index.                       |
| Summarize the key points about LangChain and its applications.     | Document_Summarizer           | Fetches relevant documents and uses an LLM to provide a concise summary of the retrieved content.                  |
| What are the main topics covered in the discussion of LangChain?     | Document_Topic_Classifier     | Extracts and lists the major topics from the documents returned by Azure AI Search, highlighting key subjects.     |

---

## Outcome After Execution

After running the solution:

- The specified text and PDF documents are successfully ingested and indexed in Azure Cognitive Search.
- A language model agent is dynamically initialized with integrated search, summarization, and topic classification tools.
- A sample query (“What is LangChain?”) is processed, with the agent deciding on the appropriate tool based on the query’s context.
- The final aggregated results, whether detailed search results, a summary, or topic breakdown, are logged to the console.

This modular, dynamic approach not only simplifies complex workflows by abstracting tool invocation, but also enhances responsiveness and flexibility—empowering you to build robust, scalable AI applications with ease.