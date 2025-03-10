# API Playground JavaScript SDK Quickstart

This quickstart guide will help you integrate the API Playground JavaScript SDK into your project. Follow the steps below to make your first API call using our hosted APIs.

---

## Prerequisites

- **Node.js:** Ensure Node.js (v14 or later) is installed.
- **API Playground Account:** Sign up for an account at [API Playground](#) and obtain your API key.
- **Environment Setup:** Create a `.env` file to store sensitive information like your API key.

---

## Installation

Install the SDK via npm:

```bash
npm install apiplayground-sdk
```

## Basic Usage
Create a JavaScript file (e.g., index.js) and add the following code:

```
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
```

## Environment Configuration

Create a .env file in the root of your project and add your API key:

```
API_PLAYGROUND_API_KEY=your_api_key_here
```

## Running Your Application

Run your project using Node.js:

```
node index.js
```