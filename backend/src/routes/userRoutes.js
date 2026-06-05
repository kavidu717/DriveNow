import express from "express";
import { deleteUser, getAllUsers, getMyProfile, loginUser, registerUser,toggleBlockUser,updateProfile,verifyOTP } from "../controller/authController.js";

import { protect } from "../middleware/protect.js";
import {adminOnly} from "../middleware/adminOnly.js"


const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp",verifyOTP);
router.post("/login",loginUser);


router.get("/profile",protect, getMyProfile);
router.put("/profile",protect, updateProfile);



router.get("/",protect,adminOnly, getAllUsers);
router.delete("/:id",protect,adminOnly,deleteUser);
router.patch("/toggle-block/:id",protect,adminOnly,toggleBlockUser);






export default router;