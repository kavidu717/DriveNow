import express from "express"
import { createBooking, getAllBookings, getMyBookings } from "../controller/bookingController.js";
import {protect} from "../middleware/protect.js" 
import {adminOnly} from "../middleware/adminOnly.js"


const router=express.Router()


router.post("/",protect,createBooking)
router.get("/",protect,adminOnly,getAllBookings)

router.get("/my",protect,getMyBookings)








export default router;