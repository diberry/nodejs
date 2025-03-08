from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI
import requests

# Azure Cognitive Search configuration (replace placeholders)
AZURE_SEARCH_SERVICE_ENDPOINT = "https://<your-search-service>.search.windows.net"
AZURE_SEARCH_INDEX = "<your-index-name>"
AZURE_SEARCH_API_KEY = "<your-azure-search-api-key>"

def azure_ai_search(query: str) -> str:
    """Simple integration with Azure AI Search."""
    search_url = f"{AZURE_SEARCH_SERVICE_ENDPOINT}/indexes/{AZURE_SEARCH_INDEX}/docs/search?api-version=2021-04-30-Preview"
    headers = {
        "Content-Type": "application/json",
        "api-key": AZURE_SEARCH_API_KEY
    }
    payload = {
        "search": query,
        "top": 3  # Return top 3 results
    }
    response = requests.post(search_url, headers=headers, json=payload)
    if response.status_code == 200:
        results = response.json()
        docs = results.get("value", [])
        # Joining a field (such as "content") from each doc, adjust as needed.
        return "\n".join([doc.get("content", str(doc)) for doc in docs])
    else:
        return f"Error: Azure Search API returned status code {response.status_code}"

# Create a Tool for Azure AI Search
azure_search_tool = Tool(
    name="AzureAI_Search",
    func=azure_ai_search,
    description="Searches Azure AI data using a query string."
)

# Initialize the agent with the Azure Search tool.
# Note: The agent will also use OpenAI to help decide when to call the tool.
llm = OpenAI(temperature=0, openai_api_key="YOUR_OPENAI_API_KEY")
agent = initialize_agent(
    tools=[azure_search_tool],
    llm=llm,
    agent="zero-shot-react-description",
    verbose=True
)

if __name__ == "__main__":
    query = "What is LangChain?"
    result = agent.run(query)
    print("Agent final result:")
    print(result)