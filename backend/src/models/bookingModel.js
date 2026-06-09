import mongoose  from "mongoose";

const bookingSchema=new.mongoose({
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
     estimatedKm: {
      type: Number,
      default: 50,
    },

    pricePerKm: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "cash"],
      default: "card",
    },

    transactionId: {
      type: String,
      default: null,
    },



},{
    timestamps:true,
})

const Booking=mongoose.model("Booking",bookingSchema);

export default Booking;