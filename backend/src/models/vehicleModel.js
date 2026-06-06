import mongoose from "mongoose";


const vehicleSchema = new mongoose.Schema({
       name:{
              type: String,
              required: true,
              trim: true
       },
       type: {
              type: String,
              required: true
       },
       brand:{
              type: String,
              required: true
       },
       model: {
              type: String,
              required: true
       },
       description: {
              type: String,
              required: true
       },
       pricePerKm:{
              type: Number,
              required: true
       },
       image: {
              type: String,
              
       },
       availability:{
              type: Boolean,
              default: true
       },
       isBlooked: {
              type: Boolean,
              default: false
       },
       rating:{
              type: Number,
              default: 0
       },
       numReviews: {
              type: Number,
              default: 0
       },
       defaultKm:{
              type: Number,
              default: 50
       }
       
              

},{timestamps:true})

 const Vehicle = mongoose.model("Vehicle", vehicleSchema);


 export default Vehicle
    