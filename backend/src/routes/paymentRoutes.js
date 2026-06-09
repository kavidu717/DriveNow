import express from "express";
import {
  createPayPalOrder,
  capturePayPalPayment,
} from "../controller/paymentController.js";

import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/create-order", protect, createPayPalOrder);
router.post("/capture", protect, capturePayPalPayment);

export default router;