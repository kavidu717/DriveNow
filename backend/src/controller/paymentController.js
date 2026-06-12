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

// CAPTURE ORDER (UPDATED)
export const capturePayPalOrder = async (req, res) => {
  try {
    const { orderId, bookingId } = req.body;

    console.log("ORDER ID:", orderId);
    console.log("BOOKING ID:", bookingId);

    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await client().execute(request);

    console.log("CAPTURE SUCCESS");
    
   
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: "PAID",
        status: "CONFIRMED",
      },
      { new: true }
    );

    console.log("UPDATED BOOKING:", updatedBooking);

    res.json({
      success: true,
      capture: capture.result,
    });
  } catch (err) {
    console.error("CAPTURE ERROR DETECTED:", err.statusCode || err.message);

  
    if (err.statusCode === 422) {
      return res.status(400).json({
        success: false,
        message: "Your payment was declined by PayPal Sandbox. Please use a valid test account or card.",
      });
    }

   
    res.status(500).json({
      success: false,
      message: "Internal Server Error during payment capture.",
    });
  }
};