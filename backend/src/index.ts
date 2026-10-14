import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config()

const app = express();
const PORT = Number(process.env.PORT) || 8080;

const allowedOrigins = (process.env.FRONTEND_URL ?? "http://localhost:5173").split(",").map((origin) => origin.trim());

app.use(
    cors({
        origin: allowedOrigins, credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.get("/", (_req, res) => {
    res.status(200).json({ message: "Welcome to hotelLair API!", success: true });
});
app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "healthy", service: "HotelLair Backend", timestamp: new Date().toISOString() });
});

app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);


const startServer = async (): Promise<void> => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`HotelLair API is running at http://localhost:${PORT}`)
        });
    }
    catch(error) {
        console.error("Failed to start HotelLair API:", error)
        process.exitCode = 1
    }
};

void startServer();

// app.listen(PORT, () => {
//     console.log(`HotelLair API is running at http://localhost:${PORT}`);
// });