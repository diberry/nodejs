import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import 'dotenv/config'
export const run = async () => {
    const loader = new GithubRepoLoader(
        "https://github.com/Microsoft/typespec",
        {
            branch: "main",
            recursive: true,
            unknown: "warn",
            maxConcurrency: 5, // Defaults to 2,
            ignorePaths: [
                "*.ts", 
                "*.py", 
                ".scripts/*", 
                "public/*", 
                "website/src/assets/*", 
                "website/src/components/*",
                "website/src/pages/*",
                "website/src/layouts/*",
                "website/src/css/*",
                "website/src/prism/*",
                "website/src/utils/*",
                ".chronus/*",
                ".devcontainer/*",
                ".github/*",
                ".vscode/*",
                "docker/*",
                "docs/*",
                "e2e/*",
                "eng/*",
                "grammars/*",
                "icons/raw/*",
                "packages/*",
                ".dockerignore",
                ".editorconfig",
                ".gitattributes",
                ".gitignore",
                ".npmrc",
                ".prettierignore",
                ".prettierrc.json",
                "CODE_OF_CONDUCT.md",
                "CONTRIBUTING.md",
                "LICENSE",
                "SECURITY.md",
                "api-extractor.base.json",
                "cspell.yaml",
                "eslint.config.js",
                "package.json",
                "pnpm-lock.yaml",
                "pnpm-workspace.yaml",
                "troubleshooting.md",
                "tsconfig.json",
                "tsconfig.base.json",
                "tsconfig.eng.json",
                "tsconfig.ws.json",
                "vitest.config.ts",
                "vitest.workspace.ts"
            ],
            accessToken: process.env.GITHUB_PAT,
            //processSubmodules: false,
        }
    );
    const docs = [];
    for await (const doc of loader.loadAsStream()) {

        console.log(`Document: ${doc.metadata.repository}/${doc.metadata.source}`);

      // @ts-ignore  
      docs.push(doc);
    }
    console.log(docs.length);
};

run().then(() => {
    console.log("Done!");
}).catch((error) => {
    console.error(error);
});
