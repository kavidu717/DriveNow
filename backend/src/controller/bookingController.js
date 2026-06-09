import Booking from "../models/bookingModel.js";
import Vehicle from "../models/vehicleModel.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { vehicle, startDate } = req.body;

    const foundVehicle = await Vehicle.findById(vehicle);

    if (!foundVehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    const estimatedKm = 50; // fixed
    const totalAmount =
      foundVehicle.pricePerKm * estimatedKm;

    const booking = await Booking.create({
      user: req.user.id,
      vehicle,
      startDate,
      estimatedKm,
      pricePerKm: foundVehicle.pricePerKm,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "firstName lastName email")
      .populate("vehicle")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("vehicle")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};