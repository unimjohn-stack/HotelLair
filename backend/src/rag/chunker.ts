export interface KnowledgeChunk {
  id: string;
  text: string;
  source: string;
  section: string;
  chunkIndex: number;
}

interface ChunkerOptions {
  maxChunkSize?: number;
  overlap?: number;
}

/**
 * Splits Markdown knowledge into searchable chunks.
 *
 * Headings are preserved as section context so retrieved chunks
 * remain understandable when separated from the original document.
 */
export const chunkMarkdown = (
  markdown: string,
  source: string,
  options: ChunkerOptions = {}
): KnowledgeChunk[] => {
  const maxChunkSize = options.maxChunkSize ?? 1000;
  const overlap = options.overlap ?? 150;

  if (maxChunkSize <= 0) {
    throw new Error("maxChunkSize must be greater than zero");
  }

  if (overlap < 0 || overlap >= maxChunkSize) {
    throw new Error("overlap must be non-negative and smaller than maxChunkSize");
  }

  const normalizedMarkdown = markdown
    .replace(/\r\n/g, "\n")
    .trim();

  if (!normalizedMarkdown) {
    return [];
  }

  const sections: Array<{ heading: string; content: string }> = [];
  let currentHeading = "General";
  let currentLines: string[] = [];

  const saveSection = (): void => {
    const content = currentLines.join("\n").trim();

    if (content) {
      sections.push({
        heading: currentHeading,
        content,
      });
    }
  };

  for (const line of normalizedMarkdown.split("\n")) {
    const headingMatch = line.match(/^#{1,6}\s+(.+)$/);

    if (headingMatch) {
      saveSection();
      currentHeading = headingMatch[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  saveSection();

  const chunks: KnowledgeChunk[] = [];
  let chunkIndex = 0;

  for (const section of sections) {
    const text = section.content.replace(/\n{3,}/g, "\n\n").trim();

    if (!text) {
      continue;
    }

    let start = 0;

    while (start < text.length) {
      let end = Math.min(start + maxChunkSize, text.length);

      if (end < text.length) {
        const boundary = text.lastIndexOf("\n\n", end);

        if (boundary > start + maxChunkSize * 0.5) {
          end = boundary;
        } else {
          const space = text.lastIndexOf(" ", end);

          if (space > start + maxChunkSize * 0.5) {
            end = space;
          }
        }
      }

      const chunkText = text.slice(start, end).trim();

      if (chunkText) {
        chunks.push({
          id: `${source}:${chunkIndex}`,
          text: `Section: ${section.heading}\n\n${chunkText}`,
          source,
          section: section.heading,
          chunkIndex,
        });

        chunkIndex += 1;
      }

      if (end >= text.length) {
        break;
      }

      const nextStart = end - overlap;
      start = nextStart > start ? nextStart : end;
    }
  }

  return chunks;
};
