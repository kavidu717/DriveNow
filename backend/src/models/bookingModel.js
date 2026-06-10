import mongoose  from "mongoose";
import User from "../models/userModel.js"
import Vehicle from "./vehicleModel.js";

const bookingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    

    pricePerKm: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancel"],
      default: "pending",
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid","paid"],
      default: "unpaid",
    },

    transactionId: {
      type: String,
     
    },



},{
    timestamps:true,
})

const Booking=mongoose.model("Booking",bookingSchema);

export default Booking;