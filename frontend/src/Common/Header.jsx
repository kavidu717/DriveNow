import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Added an icon for Logout
import useAuthStore from "../Store/authStore";

export default function Header() {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });

    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-gray-700">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-[#FF8C00] hover:opacity-80 transition-opacity"
        >
          DriveNow
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 items-center font-semibold text-sm">
          <Link to="/" className="hover:text-[#FF8C00] transition-colors duration-300">
            Home
          </Link>
          <Link to="/vehicle" className="hover:text-[#FF8C00] transition-colors duration-300">
            Vehicle
          </Link>
          <Link to="/about" className="hover:text-[#FF8C00] transition-colors duration-300">
            About Us
          </Link>
        </div>

        {/* Right Side Controls */}
        {!isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="text-gray-600 hover:text-[#FF8C00] transition-colors duration-300 font-bold text-sm px-2"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-[#FF8C00] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#e67e00] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#FF8C00]/20"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* User Profile Pill */}
            <Link
              to="/profile"
              className="flex items-center gap-3 hover:bg-orange-50 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-orange-100"
            >
              <FaUserCircle size={32} className="text-[#FF8C00]" />
              <span className="font-bold text-gray-800 hidden sm:block text-sm">
                {user?.firstName || "Profile"}
              </span>
            </Link>

            {/* Subtle Divider */}
            <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

            {/* Logout Button (Ghost Style) */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-bold text-sm transition-all"
              title="Logout"
            >
              <span className="hidden sm:block">Logout</span>
              <FaSignOutAlt className="text-lg" />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}