import 'dotenv/config';

// Hardcoded file contents
const formatTemplate = `
Title: {title}
Author: {author}
Date: {date}

Content:
{content}
`;

const contentGuidance = `
Please ensure the content is professional and follows the guidelines provided. The content should be informative and engaging.
`;

const content = `
Title: The Future of AI
Author: John Doe
Date: 2023-10-01

Content:
Artificial Intelligence (AI) is rapidly evolving and transforming various industries. From healthcare to finance, AI is making significant impacts and driving innovation.
`;
/* eslint-disable import/first */
import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({});

console.log(await chatModel.invoke("what is LangSmith?"));

/*
  AIMessage {
    content: 'Langsmith can help with testing by generating test cases, automating the testing process, and analyzing test results.',
    name: undefined,
    additional_kwargs: { function_call: undefined, tool_calls: undefined }
  }
*/

import { ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a world class technical documentation writer."],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel);

console.log(
  await chain.invoke({
    input: "what is LangSmith?",
  })
);

import { StringOutputParser } from "@langchain/core/output_parsers";

const outputParser = new StringOutputParser();

const llmChain = prompt.pipe(chatModel).pipe(outputParser);

console.log(
  await llmChain.invoke({
    input: "what is LangSmith?",
  })
);