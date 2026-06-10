import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "../utils/paypal.js";
import Booking from "../models/bookingModel.js";


// ===============================
// CREATE PAYPAL ORDER
// ===============================
export const createPayPalOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: booking.totalAmount.toFixed(2),
          },
        },
      ],
    });

    const order = await paypalClient.execute(request);

    res.status(200).json({
      success: true,
      orderID: order.result.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// CAPTURE PAYMENT + CONFIRM BOOKING
// ===============================
export const capturePayPalPayment = async (req, res) => {
  try {
    const { orderID, bookingId } = req.body;

    // 1. Find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 2. Capture PayPal payment
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await paypalClient.execute(request);

    // 3. Validate payment success
    if (capture.result.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // 4. Update booking
    booking.status = "confirmed";
    booking.paymentStatus = "paid";
    booking.transactionId = orderID;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment successful & booking confirmed",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};