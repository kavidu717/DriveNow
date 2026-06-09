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