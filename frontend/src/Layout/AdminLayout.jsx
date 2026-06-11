import { useState } from "react";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
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

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-orange-500">
            DriveNow Admin
          </h1>

          <button
            onClick={closeMenu}
            className="md:hidden"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin"
            onClick={closeMenu}
            className="block px-4 py-3 rounded hover:bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            onClick={closeMenu}
            className="block px-4 py-3 rounded hover:bg-gray-800"
          >
            Users
          </Link>

          <Link
            to="/admin/vehicles"
            onClick={closeMenu}
            className="block px-4 py-3 rounded hover:bg-gray-800"
          >
            Vehicles
          </Link>

          <Link
            to="/admin/bookings"
            onClick={closeMenu}
            className="block px-4 py-3 rounded hover:bg-gray-800"
          >
            Bookings
          </Link>

          <Link
            to="/admin/payments"
            onClick={closeMenu}
            className="block px-4 py-3 rounded hover:bg-gray-800"
          >
            Payments
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <p className="font-semibold">
            {user?.firstName} {user?.lastName}
          </p>

          <p className="text-sm text-gray-400 mb-3">
            Administrator
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white flex items-center px-4 shadow">
          <button onClick={toggleMenu}>
            <HiMenu size={28} />
          </button>

          <h2 className="ml-4 font-bold text-lg">
            DriveNow Admin
          </h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}