import express from "express";
import { loginUser, registerUser,verifyOTP } from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp",verifyOTP);
router.post("/login",loginUser);



export default router;