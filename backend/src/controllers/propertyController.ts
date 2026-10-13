import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Property from "../models/propertyModel.js";
import Booking from "../models/bookingModel.js";


export const getAllProperties = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
      return;
    }

    const property = await Property.findById(id);

    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
      return;
    }

    const property = await Property.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
      return;
    }

    const property = await Property.findById(id);

    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property not found",
      });
      return;
    }

    const existingBooking = await Booking.exists({
      property: property._id,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingBooking) {
      res.status(409).json({
        success: false,
        message:
          "Cannot delete a property with pending or confirmed bookings",
      });
      return;
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
