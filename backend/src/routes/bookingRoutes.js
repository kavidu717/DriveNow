import express from "express";
import {
  createPendingBooking,
  getBookingById,
  updateBookingStatus
} from "../controller/bookingController.js";

const router = express.Router();

// CREATE BOOKING
router.post("/create", createPendingBooking);

// GET SINGLE BOOKING
router.get("/:id", getBookingById);

// UPDATE BOOKING (payment later)
router.put("/:id", updateBookingStatus);

export default router;