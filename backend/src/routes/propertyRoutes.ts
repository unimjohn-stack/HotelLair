import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createPropertySchema, updatePropertySchema } from "../validation/propertySchema.js";
import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", protectRoute, validateRequest(createPropertySchema), createProperty);
router.patch("/:id", protectRoute, validateRequest(updatePropertySchema), updateProperty);
router.delete("/:id", protectRoute, deleteProperty);

export default router;