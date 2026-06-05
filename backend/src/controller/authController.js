import User from "../models/userModel.js";
import { generateOTP } from "../utils/generateOTP.js";
import sendEmail from "../utils/sendEmail.js";
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';


 // create register user controller
 export const registerUser = async (req, res) => {
    try{
    
        const { firstName, lastName, email, password } = req.body;

        // check if user already exists
        
        const UserExists=await User.findOne({email})
        if(UserExists){
            return res.status(400)
            .json(
                {
                message:'User already exists'
            }
        )
        }
        const otp=generateOTP();
         await User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            otp,
            otpExpires:Date.now()+10*60*1000
         })

    }catch(error){
            res.status(500)
            .json({
                 message:error.message 
                });
    }
 }