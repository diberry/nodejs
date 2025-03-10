// index.js
require('dotenv').config();
const APIPlayground = require('apiplayground-sdk');

// Initialize the SDK with your API key and endpoint
const client = new APIPlayground({
  apiKey: process.env.API_PLAYGROUND_API_KEY, // Your API key stored in the .env file
  endpoint: "https://api.apiplayground.com"      // Default endpoint; adjust if needed
});

// Example function to call a RESTful API
async function fetchData() {
  try {
    const result = await client.callAPI({
      method: 'GET',
      resource: '/data',          // The API resource you want to call
      params: { limit: 10 }         // Optional query parameters
    });
    
    console.log("API Response:", result);
  } catch (error) {
    console.error("Error calling API:", error);
  }
}

fetchData();