import express from "express";
import {
  createPendingBooking,
  getBookingById,
  updateBookingStatus,
  getAllBookings
} from "../controller/bookingController.js";
import { protect } from "../middleware/protect.js";
import { adminOnly } from "../middleware/adminOnly.js";

console.log("BOOKING ROUTES LOADED");

const router = express.Router();

// CREATE BOOKING
router.post("/create",protect, createPendingBooking);

router.get("/",protect, adminOnly, getAllBookings);

// GET SINGLE BOOKING
router.get("/:id", getBookingById);

// UPDATE BOOKING (payment later)
router.put("/:id", updateBookingStatus);




export default router;