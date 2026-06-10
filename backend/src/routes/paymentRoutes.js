import express from "express";
import {
  createPayPalOrder,
  capturePayPalPayment,
} from "../controller/paymentController.js";

const router = express.Router();

router.post("/create-order", createPayPalOrder);
router.post("/capture", capturePayPalPayment);

export default router;