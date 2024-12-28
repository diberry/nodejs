import { MemoryVectorStore } from 'langchain/vectorstores/memory'

import DocumentationManager, {DocSet } from './documentation-manager.js'
import 'dotenv/config'
import { Docstore } from 'langchain/stores/doc/base'

async function main() {
  const docManager = new DocumentationManager()

  // Load documents from files and directories
  const docSet: DocSet[] = [
    {
      path: './src/docs/content_templates',
      metadata: {
        name: `content_templates`,
        category: `content_templates`,
        scenario: `What are the key parts of the article and how are they used`,
      },
    },
    {
      path: './src/docs/content_examples',
      metadata: {
        name: `content_examples`,
        category: `content_examples`,
        scenario: `What are some real examples of the article in public use today`,
      },
    },
    {
      path: './src/docs/engineering',
      metadata: {
        name: `engineering`,
        category: `engineering`,
        scenario: `What information has the engineering team provided`,
      },
    },
    {
      path: './src/docs/writing',
      metadata: {
        name: `writing guidance`,
        category: `writing guidance`,
        scenario: `How should I write the article`,
      },
    },
  ];

  await docManager.init(docSet)

  const resultsToReturn = 3;

  // Query for relevant documents
  const results = await docManager.retrieveDocuments('What is typespec?', resultsToReturn)
  console.log(results)

  
}

main()
  .then(() => {
    console.log('Done!')
  })
  .catch((error) => {
    console.error(error)
  })
