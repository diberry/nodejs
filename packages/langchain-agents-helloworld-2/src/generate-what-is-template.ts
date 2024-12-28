import path from 'path';
import { loadAndChunkDirectoryContents, getUtf8FileContents, generate } from './utils.js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

// Declare __dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths to the guides
const writersGuideDir = path.join(__dirname, '../docs/writers_guide');
const patternLibraryDir = path.join(__dirname, '../docs/pattern_library');

// Create a text splitter
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000, chunkOverlap: 200
});

// Load and chunk the contents of the guides
const writersGuideDocs = await loadAndChunkDirectoryContents(writersGuideDir, splitter);
const patternLibraryDocs = await loadAndChunkDirectoryContents(patternLibraryDir, splitter);

// Define a custom prompt template
const systemPromptFile = path.join(__dirname, '../docs/system_prompt.md');
const systemPrompt = await getUtf8FileContents(systemPromptFile);

const customPromptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemPrompt],
  ["user", "Create a 'What is' template using the Microsoft Writer's Guide and Microsoft Pattern Library. Include placeholders for the GenAI app to fill in."]
]);

// Initialize the LLM
const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0
});

// Define the state with the loaded documents
const state = {
  question: "What is",
  context: [...writersGuideDocs, ...patternLibraryDocs]
};

// Generate the template
const response = await generate(llm, state, customPromptTemplate);
console.log(response.answer);