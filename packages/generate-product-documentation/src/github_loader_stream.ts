import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";

export const run = async () => {
    const loader = new GithubRepoLoader(
        "https://github.com/langchain-ai/langgraph-example",
        {
            branch: "main",
            recursive: true,
            unknown: "warn",
            maxConcurrency: 5, // Defaults to 2,
            ignorePaths: ["*.ts", "*.py"],
            //accessToken: "ghp_A1B2C3D4E5F6a7b8c9d0",
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
