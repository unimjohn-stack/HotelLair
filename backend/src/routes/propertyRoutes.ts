import express from "express";
import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", createProperty);
router.patch("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router