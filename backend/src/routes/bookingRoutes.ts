import express from "express"
import { createBooking, deleteBooking, getAllBookings, getBookingById, updateBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/all", getAllBookings);
router.get("/:id", getBookingById);
router.patch("/:id", updateBooking);
router.delete("/:id", deleteBooking)

export default router;