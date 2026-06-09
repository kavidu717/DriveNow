import express from "express"
import { createBooking } from "../controller/bookingController.js";
import {protect} from "../middleware/protect.js" 
import {adminOnly} from "../middleware/adminOnly.js"


const router=express.Router()


router.post("/",protect,adminOnly,createBooking)








export default router;