import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import connectDB from "../config/db.js";
import { z } from "zod";

const adminConfigSchema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  password: z.string().min(12),
});

const seedAdmin = async (): Promise<void> => {
  const config = adminConfigSchema.parse({
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL?.trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD,
  });

  const { name, email, password } = config;

  await connectDB();

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log("An account with this admin email already exists. No changes made.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await User.create({
    name,
    email,
    passwordHash,
    role: "admin",
    isActive: true,
  });

  console.log("Initial admin account created successfully.");
};

seedAdmin()
  .catch((error: unknown) => {
    console.error(
      "Admin seeding failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
