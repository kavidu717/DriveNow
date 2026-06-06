import express from "express";
import { createVehicle, getAllVehicles,
    getSingleVehicle
 } from "../controller/vehicleContoller.js";
 import { protect } from "../middleware/protect.js";
 import { adminOnly } from "../middleware/adminOnly.js";


  const router = express.Router();



 router.post("/",protect,adminOnly, createVehicle)
 router.get("/",getAllVehicles)
  router.get("/:id",getSingleVehicle)



  
  





  export default router;