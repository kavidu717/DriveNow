import express from "express";
import { createVehicle, getAllVehicles
 } from "../controller/vehicleContoller.js";
 import { protect } from "../middleware/protect.js";
 import { adminOnly } from "../middleware/adminOnly.js";


  const router = express.Router();



 router.post("/",protect,adminOnly, createVehicle)
 router.get("/",getAllVehicles)



  
  





  export default router;