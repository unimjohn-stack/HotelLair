import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

interface AdminTokenPayload {
  sub: string;
  role: "admin";
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.adminToken as string | undefined;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is missing from environment variables");
    }

    let decoded: string | jwt.JwtPayload;

    try {
      decoded = jwt.verify(token, secret, {
        algorithms: ["HS256"],
      });
    } catch {
      res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token",
      });
      return;
    }

    if (
      typeof decoded === "string" ||
      typeof decoded.sub !== "string" ||
      decoded.role !== "admin"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
      return;
    }

    const admin = await User.findById(decoded.sub).select("_id role isActive");

    if (!admin || admin.role !== "admin" || !admin.isActive) {
      res.status(401).json({
        success: false,
        message: "Admin account is unavailable",
      });
      return;
    }

    req.admin = {
      id: admin._id.toString(),
      role: "admin",
    };

    next();
  } catch (error) {
    next(error);
  }
};
