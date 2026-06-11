import { useState } from "react";
import { Navigate, Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
  HiMenu, 
  HiX, 
  HiViewGrid, 
  HiUsers, 
  HiTruck, 
  HiCalendar, 
  HiCreditCard, 
  HiLogout 
} from "react-icons/hi";
import useAuthStore from "../Store/authStore.js";

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Protect Admin Routes
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Modern navigation configuration with icons
  const navigationItems = [
    { name: "Dashboard", to: "/admin", icon: HiViewGrid, end: true },
    { name: "Users", to: "/admin/users", icon: HiUsers },
    { name: "Vehicles", to: "/admin/vehicles", icon: HiTruck },
    { name: "Bookings", to: "/admin/bookings", icon: HiCalendar },
    { name: "Payments", to: "/admin/payments", icon: HiCreditCard },
  ];

  // Shared active/inactive link styling logic
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
      isActive
        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
    }`;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased">
      
      {/* Mobile Overlay with smooth fade */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white flex flex-col border-r border-slate-800/50 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
              <HiTruck className="text-white text-xl" />
            </div>
            <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              DriveNow <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 block -mt-1">Admin Panel</span>
            </h1>
          </div>

          <button
            onClick={closeMenu}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <HiX size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={closeMenu}
                className={linkClass}
              >
                <Icon className="text-xl shrink-0 transition-transform group-hover:scale-105" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/40 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold text-orange-400 ring-2 ring-slate-800">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-slate-200 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500 font-medium truncate">
                Super Administrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-slate-900 hover:bg-red-950/40 text-slate-300 hover:text-red-400 border border-slate-800 hover:border-red-900/50 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all duration-200 active:scale-[0.98]"
          >
            <HiLogout className="text-lg" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Modern Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMenu}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <HiMenu size={24} />
            </button>
            <h2 className="font-bold text-slate-800 tracking-tight">
              DriveNow Admin
            </h2>
          </div>
          
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold text-orange-400">
            {user?.firstName?.[0]}
          </div>
        </header>

        {/* Main Fluid Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}