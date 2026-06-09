import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "../utils/paypal.js";
import Booking from "../models/bookingModel.js";



export const createPayPalOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
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
            value: booking.totalAmount.toString(),
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
      message: error.message,
    });
  }
};


export const capturePayPalPayment = async (req, res) => {
  try {
    const { orderID, bookingId } = req.body;

    const request =
      new paypal.orders.OrdersCaptureRequest(orderID);

    request.requestBody({});

    const capture = await paypalClient.execute(request);

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Update booking after successful payment
    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";
    booking.transactionId = orderID;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment successful & booking confirmed",
      booking,
      capture,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};