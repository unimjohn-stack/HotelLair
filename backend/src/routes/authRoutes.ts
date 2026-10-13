import express  from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { loginAdminSchema } from "../validation/authSchema.js";
import { loginAdmin, logoutAdmin } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/login", validateRequest(loginAdminSchema), loginAdmin);
router.post("/logout",protectRoute, logoutAdmin);

export default router
