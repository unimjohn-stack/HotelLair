import express from "express"
import { validateRequest } from "../middleware/validateRequest.js";
import { createBookingSchema, updateBookingSchema } from "../validation/bookingSchema.js";
import { createBooking, deleteBooking, getAllBookings, getBookingById, updateBooking } from "../controllers/bookingController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", validateRequest(createBookingSchema), createBooking);
router.get("/", protectRoute, getAllBookings);
router.get("/:id", protectRoute, getBookingById);
router.patch("/:id",protectRoute, validateRequest(updateBookingSchema), updateBooking);
router.delete("/:id",protectRoute, deleteBooking)

export default router;