import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../Store/authStore.js";
import toast from "react-hot-toast"; // Toaster එක මෙතනින් අයින් කරා (App.jsx එකේ තියෙන නිසා)
import { FiMail, FiLock } from "react-icons/fi"; 

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
  
      const data = await login(email, password);
      
   
      toast.success("Login successful!");
      
      // Short delay so the user can see the success toast before redirecting
      setTimeout(() => {
        if (data?.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      const errorMessage = 
        error?.response?.data?.message ||
        error?.message || 
        error ||
        "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-50 font-sans antialiased">
      
      {/* Left Side: Modern Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-8 sm:px-16 md:px-24 shadow-2xl z-10">
        <div className="max-w-md w-full mx-auto">
          
          {/* Branding & Header */}
          <div className="mb-8">
            <Link to="/" className="text-3xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent block mb-2">
              DriveNow
            </Link>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 text-sm mt-1">Sign in to manage your account and rides.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 mt-6 rounded-xl font-bold text-sm shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.99] transition-all disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Register Redirect Link */}
          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-500 font-bold hover:text-orange-600 transition-colors hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Branded Vehicle Image (Premium Grid Overlay) */}
      <div className="hidden lg:block lg:w-1/2 relative h-full bg-slate-950">
        <img 
          src="https://res.cloudinary.com/doujmzgn3/image/upload/v1780847544/tyler-clemmensen-d1Jum1vVLew-unsplash_bkqez1.jpg" 
          alt="Premium Vehicle" 
          className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
        />
        {/* Dark dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
        
        {/* Overlay Text */}
        <div className="absolute bottom-16 left-16 right-16 text-white z-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full backdrop-blur-sm">Fleet Service</span>
          <h3 className="text-3xl font-black tracking-tight mt-4 mb-2">Your premium ride awaits.</h3>
          <p className="text-slate-300 text-sm leading-relaxed max-w-md font-medium">
            Log in to pick up right where you left off and hit the road with unmatched comfort.
          </p>
        </div>
      </div>
    </div>
  );
}