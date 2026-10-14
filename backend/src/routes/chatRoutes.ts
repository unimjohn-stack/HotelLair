import express from "express";
import { sendChatMessage } from "../controllers/chatcontroller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { chatRequestSchema } from "../validation/chatSchema.js";

const router = express.Router();

router.post("/", validateRequest(chatRequestSchema), sendChatMessage);

export default router;