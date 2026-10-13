import express from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { createPropertySchema, updatePropertySchema } from "../validation/propertySchema.js";
import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", validateRequest(createPropertySchema), createProperty);
router.patch("/:id", validateRequest(updatePropertySchema), updateProperty);
router.delete("/:id", deleteProperty);

export default router