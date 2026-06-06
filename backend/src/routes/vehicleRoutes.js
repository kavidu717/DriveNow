import express from "express";
import { createVehicle
 } from "../controller/vehicleContoller.js";
 import { protect } from "../middleware/protect.js";
 import { adminOnly } from "../middleware/adminOnly.js";


  const router = express.Router();

 router.post("/",protect,adminOnly, createVehicle)
  
  





  export default router;