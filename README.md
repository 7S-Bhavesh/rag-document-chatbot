# 🤖 RAG Chatbot

A Retrieval-Augmented Generation (RAG) chatbot that lets you chat with your PDF documents using **Jina Embeddings**, **Pinecone** vector database, and **Groq (LLaMA 3.3 70B)**.

---

## 📁 Project Structure

```
rag-chatbot/
├── src/
│   ├── prepare.js        # Document loading, embedding & Pinecone indexing
│   ├── rag.js            # Entry point to index a document
│   └── chat.js           # CLI chat interface with RAG
├── docs/
│   └── cg-internal-docs.pdf   # Source document(s) to be indexed
├── .env.example          # Template for required environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🧠 Architecture

```
PDF → Chunking → Embeddings → Pinecone (Vector DB)
                                        ↓
              User Query → Embedding → Similarity Search → Context
                                                                  ↓
                                                         LLM (Groq) → Final Answer
```

---

## ⚙️ Tech Stack

| Layer         | Tool                        |
|---------------|-----------------------------|
| Embeddings    | Jina Embeddings v3          |
| Vector DB     | Pinecone                    |
| LLM           | Groq — LLaMA 3.3 70B        |
| PDF Parsing   | LangChain PDFLoader         |
| Text Splitting| RecursiveCharacterTextSplitter |
| Runtime       | Node.js (ESM)               |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/rag-chatbot.git
cd rag-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
GROQ_API_KEY=your_groq_api_key
JINA_API_KEY=your_jina_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
```

### 4. Index your document

Place your PDF inside the `docs/` folder, then run:

```bash
node src/rag.js
```

### 5. Start chatting

```bash
node src/chat.js
```

Type your question and press Enter. Type `bye` to exit.

---

## 💬 Example

```
You: What is the leave policy?
Assistant: Employees are entitled to 12 casual leaves per year...

You: bye
```

---

## 📄 Environment Variables

| Variable             | Description                        |
|----------------------|------------------------------------|
| `GROQ_API_KEY`       | API key from [groq.com](https://groq.com) |
| `JINA_API_KEY`       | API key from [jina.ai](https://jina.ai)   |
| `PINECONE_API_KEY`   | API key from [pinecone.io](https://pinecone.io) |
| `PINECONE_INDEX_NAME`| Name of your Pinecone index (dimensions: 768) |

---

## 🔒 .gitignore

```
node_modules/
.env
docs/*.pdf
```

