import type { Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../models/bookingModel.js";
import Property from "../models/propertyModel.js";

export const getAllBookings = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookings = await Booking.find()
      .populate("property", "name location pricePerNight")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

export const getBookingById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
      return;
    }

    const booking = await Booking.findById(id).populate(
      "property",
      "name location pricePerNight"
    );

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};

export const createBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      property: propertyId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      specialRequests,
    } = req.body;

    if (
      !propertyId ||
      !guestName?.trim() ||
      !guestEmail?.trim() ||
      !guestPhone?.trim() ||
      !checkIn ||
      !checkOut ||
      guests === undefined ||
      guests === null
    ) {
      res.status(400).json({
        success: false,
        message: "Please provide all required booking details",
      });
      return;
    }

    if (!mongoose.isValidObjectId(propertyId)) {
      res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
      return;
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const guestCount = Number(guests);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      endDate <= startDate
    ) {
      res.status(400).json({
        success: false,
        message: "Check-out must be after a valid check-in date",
      });
      return;
    }

    if (!Number.isInteger(guestCount) || guestCount < 1) {
      res.status(400).json({
        success: false,
        message: "Guests must be a positive whole number",
      });
      return;
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property not found",
      });
      return;
    }

    if (!property.isAvailable) {
      res.status(400).json({
        success: false,
        message: "This property is currently unavailable",
      });
      return;
    }

    if (guestCount > property.maxGuests) {
      res.status(400).json({
        success: false,
        message: `This property accommodates a maximum of ${property.maxGuests} guests`,
      });
      return;
    }

    const overlappingBooking = await Booking.findOne({
      property: propertyId,
      status: { $in: ["pending", "confirmed"] },
      checkIn: { $lt: endDate },
      checkOut: { $gt: startDate },
    });

    if (overlappingBooking) {
      res.status(409).json({
        success: false,
        message: "These dates conflict with an existing booking request",
      });
      return;
    }

    const booking = await Booking.create({
      property: propertyId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn: startDate,
      checkOut: endDate,
      guests: guestCount,
      specialRequests,
    });

    res.status(201).json({
      success: true,
      message: "Booking request submitted successfully",
      data: booking,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Booking validation failed",
        errors: Object.values(error.errors).map(
          (validationError) => validationError.message
        ),
      });
      return;
    }

    console.error("Error creating booking:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

export const updateBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
      return;
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    const allowedFields = [
      "guestName",
      "guestEmail",
      "guestPhone",
      "checkIn",
      "checkOut",
      "guests",
      "specialRequests",
      "status",
    ];

    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({
        success: false,
        message: "Provide at least one valid field to update",
      });
      return;
    }

    const startDate =
      updates.checkIn !== undefined
        ? new Date(updates.checkIn as string)
        : booking.checkIn;

    const endDate =
      updates.checkOut !== undefined
        ? new Date(updates.checkOut as string)
        : booking.checkOut;

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      endDate <= startDate
    ) {
      res.status(400).json({
        success: false,
        message: "Check-out must be after a valid check-in date",
      });
      return;
    }

    if (updates.checkIn !== undefined) updates.checkIn = startDate;
    if (updates.checkOut !== undefined) updates.checkOut = endDate;

    const guestCount =
      updates.guests !== undefined
        ? Number(updates.guests)
        : booking.guests;

    if (!Number.isInteger(guestCount) || guestCount < 1) {
      res.status(400).json({
        success: false,
        message: "Guests must be a positive whole number",
      });
      return;
    }

    const property = await Property.findById(booking.property);

    if (!property) {
      res.status(404).json({
        success: false,
        message: "The property associated with this booking no longer exists",
      });
      return;
    }

    if (guestCount > property.maxGuests) {
      res.status(400).json({
        success: false,
        message: `This property accommodates a maximum of ${property.maxGuests} guests`,
      });
      return;
    }

    const nextStatus =
      updates.status !== undefined ? updates.status : booking.status;

    if (nextStatus === "pending" || nextStatus === "confirmed") {
      const overlappingBooking = await Booking.findOne({
        _id: { $ne: booking._id },
        property: booking.property,
        status: { $in: ["pending", "confirmed"] },
        checkIn: { $lt: endDate },
        checkOut: { $gt: startDate },
      });

      if (overlappingBooking) {
        res.status(409).json({
          success: false,
          message: "These dates conflict with another booking request",
        });
        return;
      }
    }

    Object.assign(booking, updates);
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Booking validation failed",
        errors: Object.values(error.errors).map(
          (validationError) => validationError.message
        ),
      });
      return;
    }

    console.error("Error updating booking:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
      return;
    }

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};
