import { TokenTextSplitter, CharacterTextSplitter, RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";

export class TextSplitter {
    async splitText(docs: [], separator: string): Promise<Document[]> {
        const splitter = new CharacterTextSplitter({
          separator, //" ",
          chunkSize: 7,
          chunkOverlap: 3,
        });
        return await splitter.splitDocuments(docs);
       
    }

    async splitMarkdown(docs: []): Promise<Document[]> {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
            chunkSize: 500,
            chunkOverlap: 0,
          });
        return await splitter.createDocuments(docs);
    }

    async splitHTML(docs: []): Promise<Document[]> {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
            chunkSize: 175,
            chunkOverlap: 20,
          });
          return await splitter.createDocuments(docs);
          
    }

    async splitPython(docs: []): Promise<Document[]> {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("python", {
            chunkSize: 32,
            chunkOverlap: 0,
          });
          
          return await splitter.createDocuments(docs);
          
    }

    async splitJavaScript(docs: []): Promise<Document[]> {
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
            chunkSize: 32,
            chunkOverlap: 0,
          });
          
          return await splitter.createDocuments(docs);
    }
    async splitTokenizedText(docs: [], token:string): Promise<Document[]> {
        const splitter = new TokenTextSplitter({
            encodingName: "r50k_base",
            chunkSize: 10,
            chunkOverlap: 0,
            allowedSpecial: [token], //["<|endoftext|>"],
            disallowedSpecial: [],
          });
        return await splitter.splitDocuments(docs);
    }
}

// Example usage:
/*
const splitter = new TextSplitter();
console.log(splitter.splitText("This is a sample text."));
console.log(splitter.splitMarkdown("# Heading\n\nThis is a paragraph."));
console.log(splitter.splitHTML("<div>Hello</div><p>World</p>"));
console.log(splitter.splitPython("def foo():\n    pass\n\ndef bar():\n    pass"));
console.log(splitter.splitJavaScript("function foo() {}\n\nfunction bar() {}"));
*/