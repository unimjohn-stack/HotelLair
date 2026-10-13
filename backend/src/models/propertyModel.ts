
import { Schema, model, type InferSchemaType } from "mongoose";

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Property description is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Property location is required"],
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: [0, "Price cannot be negative"],
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    maxGuests: {
      type: Number,
      required: [true, "Maximum guests is required"],
      min: [1, "A property must accommodate at least one guest"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export type PropertyDocument = InferSchemaType<typeof propertySchema>;

const Property = model("Property", propertySchema);

export default Property;
