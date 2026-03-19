#  RAG Document Chatbot (Node.js + Pinecone + Groq)

>  Chat with your documents using **Retrieval-Augmented Generation (RAG)**  
> 📄 Upload a PDF → Ask questions → Get accurate answers from context

---

## 🌟 Overview

This project is a **RAG-based document chatbot** built using modern AI tools.

It allows you to:
- 📥 Ingest PDF documents
- 🔍 Retrieve relevant context using vector search
- 🤖 Generate intelligent answers using LLMs

Unlike traditional chatbots, this system **avoids hallucinations** by answering strictly from your document.

---

## 🧠 Architecture
PDF → Chunking → Embeddings → Pinecone (Vector DB)
↓
User Query → Embedding → Similarity Search → Context
↓
LLM (Groq)
↓
Final Answer


---

## 🛠️ Tech Stack

| Technology | Purpose |
|----------|--------|
| Node.js | Backend runtime |
| LangChain | RAG pipeline |
| Pinecone | Vector Database |
| Jina Embeddings | Text Embeddings |
| Groq (LLaMA 3.3) | LLM for answering |
| PDF Loader | Document ingestion |

---

## 📂 Project Structure
rag-document-chatbot/
│
├── prepare.js # Document processing & embedding
├── rag.js # Entry point to index PDF
├── chat.js # CLI chatbot interface
├── cg-internal-docs.pdf # Sample document
└── .env # API keys


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

git clone https://github.com/7S-Bhavesh/rag-document-chatbot.git
cd rag-document-chatbot
npm install
PINECONE_API_KEY=your_key
PINECONE_INDEX_NAME=your_index

JINA_API_KEY=your_key

GROQ_API_KEY=your_key

node rag.js
node chat.js
