import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../Store/authStore.js";
import toast, { Toaster } from "react-hot-toast";
import { FiUser, FiMail, FiLock } from "react-icons/fi"; // Added proper React Icons

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(firstName, lastName, email, password);
      localStorage.setItem("otpEmail", email);
      toast.success("Registration successful! OTP sent to your email.");
      navigate("/verify-otp");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white">
      <Toaster position="top-right" />
      
      {/* Left Side: Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24">
        <div className="max-w-md w-full mx-auto">
          
          {/* Branding & Header */}
          <div className="mb-8">
            <Link to="/" className="text-3xl font-black tracking-tight text-[#FF8C00] block mb-2">
              DriveNow
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">Start your premium journey with us today.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Fields Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:bg-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:bg-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:bg-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:bg-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF8C00] hover:bg-[#e67e00] text-white py-3 mt-4 rounded-lg font-bold text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Login Redirect Link */}
          <p className="mt-6 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF8C00] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Dynamic Image */}
      <div className="hidden lg:block lg:w-1/2 relative h-full">
        <img 
          src="https://res.cloudinary.com/doujmzgn3/image/upload/v1780847553/joey-banks-YApiWyp0lqo-unsplash_heewfu.jpg" 
          alt="Luxury Vehicle" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h3 className="text-3xl font-bold mb-2">Unleash your drive.</h3>
          <p className="text-gray-200 text-sm leading-relaxed max-w-md">
            Experience the ultimate freedom on the road with our curated fleet of premium vehicles, available at your fingertips.
          </p>
        </div>
      </div>
    </div>
  );
}