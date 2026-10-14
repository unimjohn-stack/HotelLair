import type { Request, Response, NextFunction } from "express";
import { chatRequestSchema } from "../validation/chatSchema.js";
import { chatWithHotelLair } from "../services/chatServices.js";

export const sendChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = chatRequestSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Request validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    const response = await chatWithHotelLair(result.data.question);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
