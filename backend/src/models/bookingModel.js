import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    estimatedKm: {
      type: Number,
      default: 50
    },

    totalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING"
    },

    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PAID"],
      default: "UNPAID"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);