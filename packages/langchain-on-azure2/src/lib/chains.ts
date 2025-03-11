import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";


export async function createCombineDocsChainWrapper(model: any, questionAnsweringPrompt: any) {
    const combineDocsChain = await createStuffDocumentsChain({
        llm: model,
        prompt: questionAnsweringPrompt,
    });
    return combineDocsChain;
}

export async function createRetrievalChainWrapper(store: any, combineDocsChain: any) {
    const chain = await createRetrievalChain({
        retriever: store.asRetriever(),
        combineDocsChain,
    });
    return chain;
}