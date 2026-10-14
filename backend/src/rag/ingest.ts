import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { chunkMarkdown } from "./chunker.js";
import { generateEmbedding } from "./embeddings.js";
import {
  ensureCollection,
  upsertChunks,
} from "./vectorStore.js";

const KNOWLEDGE_FILE = resolve(
  process.cwd(),
  "src",
  "data",
  "knowledge.md"
);

const ingestKnowledge = async (): Promise<void> => {
  console.log("Starting HotelLair knowledge ingestion...");

  const markdown = await readFile(KNOWLEDGE_FILE, "utf8");

  const chunks = chunkMarkdown(markdown, "knowledge.md");

  if (chunks.length === 0) {
    console.log("No knowledge chunks found. Nothing to ingest.");
    return;
  }

  console.log(`Prepared ${chunks.length} knowledge chunks.`);

  await ensureCollection();

  const embeddings: number[][] = [];

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];

    console.log(
      `Generating embedding ${index + 1}/${chunks.length}: ${chunk.section}`
    );

    embeddings.push(
      await generateEmbedding(chunk.text, "RETRIEVAL_DOCUMENT")
    );
  }

  await upsertChunks(chunks, embeddings);

  console.log(
    `Successfully ingested ${chunks.length} chunks into Qdrant.`
  );
};

ingestKnowledge().catch((error: unknown) => {
  console.error(
    "HotelLair ingestion failed:",
    error instanceof Error ? error.message : "Unknown error"
  );

  process.exitCode = 1;
});
