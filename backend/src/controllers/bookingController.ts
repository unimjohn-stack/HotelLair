import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Booking from "../models/bookingModel.js";
import Property from "../models/propertyModel.js";

export const getAllBookings = async (
  _req: Request,
  res: Response,
  next: NextFunction
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
    next(error);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
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
    next(error);
  }
};

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const property = await Property.findById(propertyId);

    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property not found",
      });
      return;
    }

    if (!property.isAvailable) {
      res.status(409).json({
        success: false,
        message: "This property is currently unavailable",
      });
      return;
    }

    if (guests > property.maxGuests) {
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
      guests,
      specialRequests,
    });

    res.status(201).json({
      success: true,
      message: "Booking request submitted successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
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

    const {
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      specialRequests,
      status,
    } = req.body;

    const startDate =
      checkIn !== undefined ? new Date(checkIn) : booking.checkIn;

    const endDate =
      checkOut !== undefined ? new Date(checkOut) : booking.checkOut;

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      endDate <= startDate
    ) {
      res.status(400).json({
        success: false,
        message: "Check-out must be after check-in",
      });
      return;
    }

    const guestCount = guests !== undefined ? guests : booking.guests;

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

    if (!property.isAvailable && status === "confirmed") {
      res.status(409).json({
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

    const nextStatus = status ?? booking.status;

    if (["pending", "confirmed"].includes(nextStatus)) {
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

    if (guestName !== undefined) booking.guestName = guestName;
    if (guestEmail !== undefined) booking.guestEmail = guestEmail;
    if (guestPhone !== undefined) booking.guestPhone = guestPhone;
    if (checkIn !== undefined) booking.checkIn = startDate;
    if (checkOut !== undefined) booking.checkOut = endDate;
    if (guests !== undefined) booking.guests = guestCount;
    if (specialRequests !== undefined) {
      booking.specialRequests = specialRequests;
    }
    if (status !== undefined) booking.status = status;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
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
    });
  } catch (error) {
    next(error);
  }
};
