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
        const user= await User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            otp,
            otpExpires:Date.now()+10*60*1000
         })

         await sendEmail(
               email,
               "Email Verification OTP",
              `Your OTP is: ${otp}`
          );

    res.status(201).json({
      message: "OTP sent to email"
    })


    }catch(error){
            res.status(500)
            .json({
                 message:error.message 
                });
    }
 }

 export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ message: "Already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.json({
      message: "Email verified successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body

           const user = await User.findOne({ email }).select("+password");
   

    if (!user) {
      return res.status(400).
      json({
         message: "Invalid credentials" 
        });

    }
       if (!user.isVerified) {

      return res.status(400)
      .json({
        message: "Please verify your email first"
      });
    }
     
     if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked by admin"
      });
    }

     const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400)
      .json({
         message: "password is incorrect" 
        });
    }
     const token = jsonwebtoken.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
       _id: user._id,
         firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        role: user.role,
    });

    }catch(error){
     res.status(500)
     .json({
        message:error.message
     })
    }

}

export const getMyProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password")

        res.status(200)
        .json({
            success:"true",
            user
        })

    }catch(error){
        res.status(500)
        .json({
            message:error.message
        })
    }
}

export const updateProfile = async (req, res) => {
  try {

    const { FirstName, LastName } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllUsers=async(req,res)=>{
    try{
    
        const users=await User.find().select("-password")

        

        res.status(200)
        .json({
            success:"user fetch success",
            count:users.length,
            users
        })

    }catch(error){
        res.status(500)
        .json({
            message:error.message
        })
    }
}

export const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const toggleBlockUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
