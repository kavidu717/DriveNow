import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../Store/authStore.js";
import toast, { Toaster } from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi"; // Added proper React Icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful!");
      
      // Short delay so the user can see the success toast before redirecting
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const errorMessage = 
        error?.response?.data?.message ||
        error ||
        "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* h-screen and overflow-hidden completely disable page scrolling */
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
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to manage your account and rides.</p>
          </div>

          {/* Form with unchanged logic bindings */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Redirect Link */}
          <p className="mt-6 text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FF8C00] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Branded Vehicle Image */}
      <div className="hidden lg:block lg:w-1/2 relative h-full">
        <img 
          src="https://res.cloudinary.com/doujmzgn3/image/upload/v1780847544/tyler-clemmensen-d1Jum1vVLew-unsplash_bkqez1.jpg" 
          alt="Premium Vehicle" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark dynamic gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Overlay Text */}
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h3 className="text-3xl font-bold mb-2">Your premium ride awaits.</h3>
          <p className="text-gray-200 text-sm leading-relaxed max-w-md">
            Log in to pick up right where you left off and hit the road with unmatched comfort.
          </p>
        </div>
      </div>
    </div>
  );
}