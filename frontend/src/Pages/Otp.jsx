import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore.js";
import toast, { Toaster } from "react-hot-toast";
import { FiShield } from "react-icons/fi";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const email = localStorage.getItem("otpEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyOtp(email, otp);
      toast.success("OTP Verified Successfully!");
      localStorage.removeItem("otpEmail");
      
      // Short delay so the user can see the success toast before redirecting
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        
        {/* Icon Header */}
        <div className="w-16 h-16 bg-[#FF8C00]/10 text-[#FF8C00] rounded-full flex items-center justify-center mx-auto mb-6">
          <FiShield className="text-3xl" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
        
        <p className="text-gray-500 text-sm mb-8">
          We've sent a verification code to <br />
          <span className="font-semibold text-gray-900">{email || "your email address"}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-2xl font-bold text-center tracking-[0.5em] focus:bg-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all placeholder:text-gray-300 placeholder:tracking-normal placeholder:font-normal placeholder:text-base"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !otp}
            className="w-full bg-[#FF8C00] hover:bg-[#e67e00] text-white py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

       
      </div>
    </div>
  );
}