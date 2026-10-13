import express from "express"
import { validateRequest } from "../middleware/validateRequest.js";
import { createBookingSchema, updateBookingSchema } from "../validation/bookingSchema.js";
import { createBooking, deleteBooking, getAllBookings, getBookingById, updateBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", validateRequest(createBookingSchema), createBooking);
router.get("/all", getAllBookings);
router.get("/:id", getBookingById);
router.patch("/:id", validateRequest(updateBookingSchema), updateBooking);
router.delete("/:id", deleteBooking)

export default router;