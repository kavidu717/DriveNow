import express from "express";
import { createPendingBooking } from "../controller/bookingController.js";

const router = express.Router();

router.post("/create-pending", createPendingBooking);

export default router;