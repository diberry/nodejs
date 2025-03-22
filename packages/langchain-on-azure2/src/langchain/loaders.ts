import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type { Document } from "@langchain/core/documents";

export async function loadTextFromFile(
  filePath: string, 
  chunkSize: number = 1000, 
  chunkOverlap: number = 100): 
Promise<Document<Record<string, any>>[]> 
{
  const loader = new TextLoader(filePath);
  const rawDocs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap
  });
  const docs = await splitter.splitDocuments(rawDocs);
  return docs;
}

export async function loadPdfFromFile(
  filePath: string, 
  chunkSize: number = 1000, 
  chunkOverlap: number = 100):
Promise<Document<Record<string, any>>[]>
{
  const loader = new PDFLoader(filePath);
  const rawDocs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap
  });
  const docs = await splitter.splitDocuments(rawDocs);
  return docs;
}