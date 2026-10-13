
import { Schema, model, Types, type InferSchemaType } from "mongoose";

const bookingSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property is required"],
    },

    guestName: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
    },

    guestEmail: {
      type: String,
      required: [true, "Guest email is required"],
      trim: true,
      lowercase: true,
    },

    guestPhone: {
      type: String,
      required: [true, "Guest phone number is required"],
      trim: true,
    },

    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"],
    },

    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
      validate: {
        validator: function (this: { checkIn?: Date }, value: Date) {
          return !this.checkIn || value > this.checkIn;
        },
        message: "Check-out must be after check-in",
      },
    },

    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least one guest is required"],
      validate: {
        validator: Number.isInteger,
        message: "Number of guests must be a whole number",
      },
    },

    specialRequests: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "cancelled", "rejected"],
        message: "Invalid booking status",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export type BookingDocument = InferSchemaType<typeof bookingSchema>;

const Booking = model("Booking", bookingSchema);

export default Booking;
