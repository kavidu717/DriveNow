import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaUser, FaHistory, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import useAuthStore from "../Store/authStore";

export default function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isAuthenticated } = useAuthStore();

  // Close dropdown menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });

    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center text-slate-700">
        
        {/* Left: Mobile Hamburger Trigger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-600 hover:text-orange-500 transition-colors p-1"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Center/Left: Logo */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          DriveNow
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center font-semibold text-sm">
          <Link to="/" className="text-slate-600 hover:text-orange-500 transition-colors duration-200">
            Home
          </Link>
          <Link to="/vehicle" className="text-slate-600 hover:text-orange-500 transition-colors duration-200">
            Vehicle
          </Link>
          <Link to="/about" className="text-slate-600 hover:text-orange-500 transition-colors duration-200">
            About Us
          </Link>
        </div>

        {/* Right Side Controls */}
        {!isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <Link
              to="/login"
              className="text-slate-600 hover:text-orange-500 transition-colors duration-200 font-bold text-sm px-2"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            
            {/* User Profile Pill Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-all border border-slate-100 shadow-sm"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-sm uppercase shadow-sm">
                {user?.firstName?.[0] || <FaUserCircle size={20} />}
              </div>
              <span className="font-bold text-slate-800 hidden sm:block text-sm">
                {user?.firstName || "Profile"}
              </span>
              <FaChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-50 mb-1">
                  <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>

                {/* Profile Item */}
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors"
                >
                  <FaUser className="text-slate-400 text-base" />
                  <span>View Profile</span>
                </Link>

                {/* My Bookings Item */}
                <Link
                  to="/bookings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors"
                >
                  <FaHistory className="text-slate-400 text-base" />
                  <span>My Bookings</span>
                </Link>

                <div className="border-t border-slate-50 my-1"></div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50/60 font-semibold transition-colors"
                >
                  <FaSignOutAlt className="text-base" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Drawer Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 shadow-lg py-4 px-6 flex flex-col gap-4 font-semibold text-base animate-in slide-in-from-top duration-200 z-40">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 hover:text-orange-500 py-1 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/vehicle" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 hover:text-orange-500 py-1 transition-colors"
          >
            Vehicle
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-600 hover:text-orange-500 py-1 transition-colors"
          >
            About Us
          </Link>
        </div>
      )}
    </header>
  );
}