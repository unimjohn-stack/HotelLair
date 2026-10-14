import { generateEmbedding } from "./embeddings.js";
import { getCollectionName, qdrant, } from "./vectorStore.js";

export interface RetrievedChunk {
  text: string;
  source: string;
  section: string;
  score: number;
}

interface RetrievalOptions {
  limit?: number;
  scoreThreshold?: number;
}

export const retrieveKnowledge = async (
  question: string,
  options: RetrievalOptions = {}
): Promise<RetrievedChunk[]> => {
  const normalizedQuestion = question.trim();

  if (!normalizedQuestion) {
    return [];
  }

  const limit = options.limit ?? 5;
  const scoreThreshold = options.scoreThreshold ?? 0.35;

  const queryEmbedding = await generateEmbedding(
    normalizedQuestion,
    "RETRIEVAL_QUERY"
  );

  const results = await qdrant.query(getCollectionName(), {
    query: queryEmbedding,
    limit,
    with_payload: true,
    score_threshold: scoreThreshold,
  });

  return results.points.flatMap((point) => {
    const payload = point.payload;

    if (
      typeof payload?.text !== "string" ||
      typeof payload?.source !== "string" ||
      typeof payload?.section !== "string"
    ) {
      return [];
    }

    return [{
      text: payload.text,
      source: payload.source,
      section: payload.section,
      score: point.score,
    }];
  });
};
