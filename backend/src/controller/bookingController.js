import Booking from "../models/bookingModel.js";

// CREATE PENDING BOOKING
export const createPendingBooking = async (req, res) => {
  try {
    const {
      userId,
      vehicleId,
      startDate,
      estimatedKm,
      totalAmount,
    } = req.body;

    const booking = new Booking({
      userId,
      vehicleId,
      startDate,
      estimatedKm,
      totalAmount,
      status: "pending",
      paymentStatus: "unpaid",
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created (pending payment)",
      bookingId: booking._id,
      totalAmount: booking.totalAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};