
// to run this first run Elastic's docker-container with `docker-compose up -d --build`
// export async function run() {
//   const config: ElasticsearchConfig = {
//     elasticUrl: process.env.ELASTIC_URL,
//     apiKey: process.env.ELASTIC_API_KEY,
//     username: process.env.ELASTIC_USERNAME,
//     password: process.env.ELASTIC_PASSWORD,
//     indexName: process.env.ELASTIC_INDEX,
//   };

//   const service = new ElasticsearchService(config);

//   const docs = [
//     new Document({
//       metadata: { foo: "bar" },
//       pageContent: "Elasticsearch is a powerful vector db",
//     }),
//     new Document({
//       metadata: { foo: "bar" },
//       pageContent: "the quick brown fox jumped over the lazy dog",
//     }),
//     new Document({
//       metadata: { baz: "qux" },
//       pageContent: "lorem ipsum dolor sit amet",
//     }),
//     new Document({
//       metadata: { baz: "qux" },
//       pageContent:
//         "Elasticsearch a distributed, RESTful search engine optimized for speed and relevance on production-scale workloads.",
//     }),
//   ];

//   const embeddings = new OpenAIEmbeddings();
//   await service.initializeVectorStore(docs, embeddings);

//   const results = await service.search("fox jump", 1);
//   console.log(JSON.stringify(results, null, 2));

//   const response = await service.runChain("What is Elasticsearch?");
//   console.log(JSON.stringify(response, null, 2));

//   const ids = results.map(result => result.id);
//   await service.deleteDocuments(ids);

//   const response2 = await service.runChain("What is Elasticsearch?");
//   console.log(JSON.stringify(response2, null, 2));
// }