import express from "express";
import {
  createPendingBooking,
  getBookingById,
  updateBookingStatus
} from "../controller/bookingController.js";
import { protect } from "../middleware/protect.js";

console.log("BOOKING ROUTES LOADED");

const router = express.Router();

// CREATE BOOKING
router.post("/create",protect, createPendingBooking);

// GET SINGLE BOOKING
router.get("/:id", getBookingById);

// UPDATE BOOKING (payment later)
router.put("/:id", updateBookingStatus);


router.get("/test", (req, res) => {
  res.send("Booking Router Working");
});

export default router;