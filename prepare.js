import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

// --- CUSTOM JINA WRAPPER (Fixes the Validation Error) ---
class JinaEmbeddingsFixed {
  constructor() {
    this.apiKey = process.env.JINA_API_KEY;
    this.modelName = "jina-embeddings-v3";
  }

  async embedDocuments(texts) {
    const response = await fetch("https://api.jina.ai/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.modelName,
        task: "retrieval.passage", // Correct task for indexing documents
        dimensions: 768,
        input: texts,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(`Jina Error: ${JSON.stringify(data)}`);
    return data.data.map((item) => item.embedding);
  }

  async embedQuery(text) {
    const response = await fetch("https://api.jina.ai/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.modelName,
        task: "retrieval.query", // Correct task for searching
        dimensions: 768,
        input: [text],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(`Jina Error: ${JSON.stringify(data)}`);
    return data.data[0].embedding;
  }
}

// 1. Use our fixed class
const embeddings = new JinaEmbeddingsFixed();

// 2. Initialize Pinecone
const pinecone = new PineconeClient({ apiKey: process.env.PINECONE_API_KEY });
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
});

export async function indexTheDocument(filePath) {
  try {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);
    console.log(`🚀 Sending ${splitDocs.length} chunks to Pinecone...`);

    // 3. Store in Pinecone
    await PineconeStore.fromDocuments(splitDocs, embeddings, {
      pineconeIndex,
    });
    await vectorStore.addDocuments(splitDocs)
    console.log("✅ Successfully indexed!");
  } catch (error) {
    console.error("❌ Critical Error:", error.message);
  }
}
