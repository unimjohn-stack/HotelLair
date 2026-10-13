import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().trim().min(1, "Property name is required"),
  description: z.string().trim().min(1, "Description is required"),
  location: z.string().trim().min(1, "Location is required"),
  pricePerNight: z.number().finite().nonnegative(
    "Price cannot be negative"
  ),
  images: z.array(z.string().trim().min(1)).optional(),
  amenities: z.array(z.string().trim().min(1)).optional(),
  maxGuests: z.number().int().min(1, "At least one guest is required"),
  isAvailable: z.boolean().optional(),
});

export const updatePropertySchema = createPropertySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one property field to update",
});