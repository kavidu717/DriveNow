import Booking from "../models/bookingModel.js";

// CREATE PENDING BOOKING
export const createPendingBooking = async (req, res) => {
  try {
    const {
      userId,
      vehicleId,
      startDate,
      estimatedKm,
      totalAmount
    } = req.body;

    // validation (important)
    if (!userId || !vehicleId || !startDate) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const booking = await Booking.create({
      userId,
      vehicleId,
      startDate,
      estimatedKm,
      totalAmount,
      status: "PENDING",
      paymentStatus: "UNPAID"
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// GET SINGLE BOOKING
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("vehicleId")
      .populate("userId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE BOOKING STATUS (for payment later)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    );

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};