import { PineconeStore } from "@langchain/pinecone";
import Groq from "groq-sdk";
import readline from "node:readline/promises";
import { vectorStore } from "./prepare.js";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export async function chat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await rl.question("You: ");
    if (question == "bye") {
      break;
    }
    const relvanChunks = await vectorStore.similaritySearch(question, 3);
    // console.log(relvanChunks)
    const context = relvanChunks.map((chunk) => chunk.pageContent).join("\n\n");
    const SYSTEM_PROMPT = `You are an assistant for question-answering tasks. Use the following relevant pieces of retrieved context to answer the question. If you don't know the answer, say I don't know.`;
    const userQuery = `Question:${question} \ncontext:${context} \n Answer:`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
    });
    console.log(`Assistant:${completion.choices[0]?.message?.content}`);
  }
  rl.close();
}
chat();
