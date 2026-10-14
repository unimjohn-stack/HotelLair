import { z } from "zod";

export const chatRequestSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question cannot be empty")
    .max(2000, "Question must not exceed 2000 characters"),
});
