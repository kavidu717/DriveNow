import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
     FirstName: {
      type: String,
      required: true
    },
        LastName: {

        type: String,
        required: true
        },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    otp: String,

    otpExpires: Date,

    profileImage: String,

    passwordResetToken: String,
    passwordResetExpires: Date,

    passwordResetToken: String,
    passwordResetExpires: Date


},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema);
export default User;