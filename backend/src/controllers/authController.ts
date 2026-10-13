import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

const isProduction = process.env.NODE_ENV === "production";


export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({
      email,
      role: "admin",
      isActive: true,
    }).select("+passwordHash");

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordMatches) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const token = generateToken(admin._id.toString());

    admin.lastLoginAt = new Date();
    await admin.save();

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAdmin = (
  _req: Request,
  res: Response
): void => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
};
