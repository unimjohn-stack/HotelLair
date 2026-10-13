import { z } from "zod";

const dateString = z.iso.datetime({
  offset: true,
});

export const createBookingSchema = z.object({
  property: z.string().regex(
    /^[a-f\d]{24}$/i,
    "Invalid property ID"
  ),
  guestName: z.string().trim().min(1, "Guest name is required"),
  guestEmail: z.email("Enter a valid email address"),
  guestPhone: z.string().trim().min(1, "Guest phone is required"),
  checkIn: dateString,
  checkOut: dateString,
  guests: z.number().int().min(1, "At least one guest is required"),
  specialRequests: z.string().trim().optional(),
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  }
);

export const updateBookingSchema = z.object({
  guestName: z.string().trim().min(1).optional(),
  guestEmail: z.email().optional(),
  guestPhone: z.string().trim().min(1).optional(),
  checkIn: dateString.optional(),
  checkOut: dateString.optional(),
  guests: z.number().int().min(1).optional(),
  specialRequests: z.string().trim().optional(),
  status: z.enum(["pending", "confirmed", "cancelled", "rejected"]).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "Provide at least one booking field to update",
});