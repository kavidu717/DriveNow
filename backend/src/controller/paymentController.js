import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import { client } from "../utils/payPal.js";
import Booking from "../models/bookingModel.js";

// CREATE ORDER
export const createPayPalOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    console.log("CURRENT BACKEND CLIENT ID IN USE:", process.env.PAYPAL_CLIENT_ID);

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();

    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (booking.totalAmount / 300).toFixed(2), // LKR → USD approx
          },
        },
      ],
    });

    const order = await client().execute(request);

    res.json({
      id: order.result.id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const capturePayPalOrder = async (req, res) => {
  try {
    const { orderId, bookingId } = req.body;

    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);

    request.requestBody({});

    const capture = await client().execute(request);

    // ✅ mark booking as PAID
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "PAID",
      status: "CONFIRMED",
    });

    res.json({
      success: true,
      capture: capture.result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};