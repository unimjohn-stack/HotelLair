import type { Request, Response } from "express";
import mongoose from "mongoose";
import Property from "../models/propertyModel.js";

export const getAllProperties = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
    });
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response
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
    console.error("Error fetching property:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
    });
  }
};

export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      description,
      location,
      pricePerNight,
      images,
      amenities,
      maxGuests,
      isAvailable,
    } = req.body;

    const property = await Property.create({
      name,
      description,
      location,
      pricePerNight,
      images,
      amenities,
      maxGuests,
      isAvailable,
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Property validation failed",
        errors: Object.values(error.errors).map(
          (validationError) => validationError.message
        ),
      });
      return;
    }

    if (
      error instanceof mongoose.Error.CastError ||
      (error instanceof Error && error.name === "StrictModeError")
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid property data",
      });
      return;
    }

    console.error("Error creating property:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create property",
    });
  }
};

export const updateProperty = async (
  req: Request,
  res: Response
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

    const allowedFields = [
      "name",
      "description",
      "location",
      "pricePerNight",
      "images",
      "amenities",
      "maxGuests",
      "isAvailable",
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
        message: "Provide at least one valid property field to update",
      });
      return;
    }

    const property = await Property.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

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
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Property validation failed",
        errors: Object.values(error.errors).map(
          (validationError) => validationError.message
        ),
      });
      return;
    }

    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({
        success: false,
        message: "Invalid property data",
      });
      return;
    }

    console.error("Error updating property:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update property",
    });
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response
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

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      res.status(404).json({
        success: false,
        message: "Property not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
      data: property,
    });
  } catch (error) {
    console.error("Error deleting property:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete property",
    });
  }
};