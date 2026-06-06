import express from "express";
import { createVehicle, getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
 } from "../controller/vehicleContoller.js";
 import { protect } from "../middleware/protect.js";
 import { adminOnly } from "../middleware/adminOnly.js";


  const router = express.Router();



 router.post("/",protect,adminOnly, createVehicle)
 router.get("/",getAllVehicles)
  router.get("/:id",getSingleVehicle)
  
  router.put("/:id", protect, adminOnly, updateVehicle);
router.delete("/:id", protect, adminOnly, deleteVehicle);




  
  





  export default router;