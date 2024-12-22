project-root/
├── src/
│   ├── agents/
│   │   ├── contentAgent.js          # LangChain agent for processing articles
│   │   └── classificationAgent.js  # LangChain agent for classifying content types
│   │
│   ├── chains/
│   │   ├── inputParsingChain.js    # Chain for parsing Markdown and images
│   │   ├── styleGuideChain.js      # Chain for processing style guidance
│   │   ├── contentGenerationChain.js # Chain for generating content
│   │   └── templateGenerationChain.js # Chain for applying templates
│   │
│   ├── utils/
│   │   ├── fileUtils.js            # Functions to read and traverse directories
│   │   ├── markdownUtils.js        # Utilities for processing Markdown content
│   │   └── ocrUtils.js             # OCR processing functions for images
│   │
│   ├── loaders/
│   │   ├── markdownLoader.js       # Loader for Markdown files
│   │   ├── imageLoader.js          # Loader for image files
│   │   └── guidanceLoader.js       # Loader for style guidance
│   │
│   ├── processors/
│   │   ├── textProcessor.js        # Summarizes, reformats, and structures text
│   │   ├── metadataProcessor.js    # Adds metadata to documents
│   │   └── classificationProcessor.js # Classifies content into article types
│   │
│   ├── templates/
│   │   ├── overviewTemplate.ejs    # Template for "Overview" articles
│   │   ├── quickstartTemplate.ejs  # Template for "Quickstart" articles
│   │   ├── installTemplate.ejs     # Template for "How to Install" articles
│   │   ├── developTemplate.ejs     # Template for "How to Develop" articles
│   │   └── referenceTemplate.ejs   # Template for "Reference" articles
│   │
│   ├── config/
│   │   ├── langchainConfig.js      # LangChain configuration (e.g., LLM, tools)
│   │   ├── paths.js                # Centralized paths for input/output directories
│   │   └── constants.js            # Constants like default settings, file extensions
│   │
│   └── index.js                    # Main entry point of the application
│
├── tests/
│   ├── agents/
│   │   ├── contentAgent.test.js
│   │   └── classificationAgent.test.js
│   │
│   ├── chains/
│   │   ├── inputParsingChain.test.js
│   │   ├── styleGuideChain.test.js
│   │   ├── contentGenerationChain.test.js
│   │   └── templateGenerationChain.test.js
│   │
│   ├── utils/
│   │   ├── fileUtils.test.js
│   │   └── markdownUtils.test.js
│   │
│   └── endToEnd.test.js            # Test for the complete workflow
│
├── output/
│   ├── articles/                   # Final generated articles
│   ├── logs/                       # Logs from processing
│   └── temp/                       # Temporary files (e.g., OCR outputs)
│
├── input/
│   ├── docs/                       # Internal product documentation
│   ├── images/                     # Supporting image files
│   └── style-guidance/             # Microsoft style guidance
│
├── scripts/
│   ├── preprocessDocs.js           # Preprocess Markdown and images
│   └── runAgent.js                 # Script to run the main LangChain agent
│
├── .env                            # Environment variables (e.g., API keys)
├── .gitignore                      # Ignored files and folders
├── package.json                    # Node.js dependencies and scripts
└── README.md                       # Project description and usage instructions
