import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("API Error:", error);

  if (res.headersSent) {
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: "Data validation failed",
      errors: Object.values(error.errors).map(
        (validationError) => validationError.message
      ),
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid data format",
    });
    return;
  }

  const statusCode =
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    error.statusCode >= 400 &&
    error.statusCode < 600
      ? error.statusCode
      : 500;

  const message =
    statusCode === 500
      ? "Internal server error"
      : error instanceof Error
        ? error.message
        : "Request failed";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
