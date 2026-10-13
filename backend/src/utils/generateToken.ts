
import jwt from "jsonwebtoken";

export const generateToken = (adminId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  return jwt.sign(
    { sub: adminId, role: "admin" },
    secret,
    { expiresIn: "1d" }
  );
};
