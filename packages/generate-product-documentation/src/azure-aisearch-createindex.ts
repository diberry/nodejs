import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";
import fs from "fs";
  import path from 'path';
  import { fileURLToPath } from 'url';
  
  // Declare __dirname
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

import 'dotenv/config'

// Load the schema from index-schema.json
const schemaPath = path.join(__dirname, "../docs", "index-hotel-schema.json");
console.log(schemaPath);
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));



// Azure Search service details
const searchEndpoint = process.env.AZURE_AISEARCH_ENDPOINT!;
const apiKey = process.env.AZURE_AISEARCH_KEY!;

// Create the SearchIndexClient
const client = new SearchIndexClient(searchEndpoint, new AzureKeyCredential(apiKey));

async function createIndex() {
  try {
    // Create the index
    await client.createIndex(schema);
    console.log("Index created successfully.");
  } catch (error) {
    console.error("Error creating index:", error);
  }
}

createIndex();