import "dotenv/config";
import { QdrantClient } from "@qdrant/js-client-rest";
import {
  EMBEDDING_DIMENSIONS,
} from "./embeddings.js";
import type { KnowledgeChunk } from "./chunker.js";

const url = process.env.QDRANT_URL ?? "http://localhost:6333";
const collectionName =
  process.env.QDRANT_COLLECTION ?? "hotellair_knowledge";

export const qdrant = new QdrantClient({ url });

export const ensureCollection = async (): Promise<void> => {
  const collections = await qdrant.getCollections();

  const exists = collections.collections.some(
    (collection) => collection.name === collectionName
  );

  if (!exists) {
    await qdrant.createCollection(collectionName, {
      vectors: {
        size: EMBEDDING_DIMENSIONS,
        distance: "Cosine",
      },
    });

    console.log(`Created Qdrant collection: ${collectionName}`);
  }
};

export const upsertChunks = async (
  chunks: KnowledgeChunk[],
  embeddings: number[][]
): Promise<void> => {
  if (chunks.length !== embeddings.length) {
    throw new Error("Each chunk must have exactly one embedding");
  }

  if (chunks.length === 0) {
    return;
  }

  const points = chunks.map((chunk, index) => {
    const vector = embeddings[index];

    if (
      !vector ||
      vector.length !== EMBEDDING_DIMENSIONS
    ) {
      throw new Error(
        `Invalid embedding dimensions for chunk ${chunk.id}`
      );
    }

    return {
      id: chunk.id,
      vector,
      payload: {
        text: chunk.text,
        source: chunk.source,
        section: chunk.section,
        chunkIndex: chunk.chunkIndex,
      },
    };
  });

  await qdrant.upsert(collectionName, {
    wait: true,
    points,
  });
};

export const getCollectionName = (): string => collectionName;
