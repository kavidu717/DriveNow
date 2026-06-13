import { useEffect, useState } from "react";
import useAuthStore from "../Store/authStore";
import { FaUserAlt, FaEnvelope, FaIdCard, FaPhoneAlt, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { FiCheckCircle, FiEdit3, FiCamera, FiSettings, FiClock, FiCreditCard } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, fetchProfile } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Fetch latest profile data
  useEffect(() => {
    const loadData = async () => {
      await fetchProfile();
      setLoading(false);
    };
    loadData();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00]"></div>
          <p className="text-gray-500 font-medium text-sm animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-28 pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 📱 Left Column: Main Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* User Identity Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
              {/* Cover Banner */}
              <div className="h-32 bg-gradient-to-r from-slate-900 to-slate-800 relative">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]"></div>
              </div>

              {/* Profile Content */}
              <div className="px-6 pb-8 relative">
                {/* Avatar */}
                <div className="relative w-max -mt-16 mb-4">
                  <div className="h-28 w-28 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center relative group">
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#FF8C00] to-amber-500 flex items-center justify-center text-4xl font-black text-white uppercase">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </div>
                    )}
                    {/* Hover Camera Icon */}
                    <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <FiCamera className="text-white text-2xl" />
                    </button>
                  </div>
                  
                  {/* Verified Badge */}
                  <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <FiCheckCircle className="text-blue-500 text-xl fill-blue-50" />
                  </div>
                </div>

                {/* Name & Role */}
                <div>
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5 font-medium">
                    <FaEnvelope className="text-gray-400" /> {user?.email}
                  </p>
                </div>

                {/* Quick Action Button */}
                <button className="w-full mt-6 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                  <FiEdit3 className="text-gray-500" /> Edit Profile
                </button>
              </div>
            </div>

            {/* Verification Status Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-green-500" /> Trust & Verification
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Address</span>
                  <span className="text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone Number</span>
                  <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-100">Pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Identity Card</span>
                  <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-100">Pending</span>
                </div>
              </div>
              <button className="w-full mt-5 text-[#FF8C00] font-bold text-sm hover:underline text-left">
                Complete Verification →
              </button>
            </div>

          </div>

          {/* 💻 Right Column: Details & Settings */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <FiClock size={16} />
                </div>
                <span className="text-2xl font-black text-gray-900">0</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Trips Taken</span>
              </div>
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF8C00] flex items-center justify-center mb-3">
                  <FiCreditCard size={16} />
                </div>
                <span className="text-2xl font-black text-gray-900">1</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Cards Linked</span>
              </div>
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center md:col-span-2 relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative z-10">
                  <h4 className="font-bold text-gray-900 mb-1">Become a VIP Member</h4>
                  <p className="text-xs text-gray-500 max-w-[200px]">Unlock exclusive discounts and priority bookings.</p>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-amber-100 to-transparent"></div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-black text-gray-900">Personal Information</h2>
              </div>
              
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                
                {/* Info Item */}
                <div className="group">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <FaUserAlt /> First Name
                  </div>
                  <p className="text-base font-semibold text-gray-800 bg-gray-50/50 p-3 rounded-xl border border-transparent group-hover:border-gray-100 transition-colors">
                    {user?.firstName || "Not provided"}
                  </p>
                </div>

                {/* Info Item */}
                <div className="group">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <FaIdCard /> Last Name
                  </div>
                  <p className="text-base font-semibold text-gray-800 bg-gray-50/50 p-3 rounded-xl border border-transparent group-hover:border-gray-100 transition-colors">
                    {user?.lastName || "Not provided"}
                  </p>
                </div>

                {/* Info Item */}
                <div className="group">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <FaPhoneAlt /> Phone Number
                  </div>
                  <p className="text-base font-semibold text-gray-800 bg-gray-50/50 p-3 rounded-xl border border-transparent group-hover:border-gray-100 transition-colors">
                    {user?.phoneNumber || "+94 7X XXX XXXX"}
                    <span className="ml-2 text-xs text-[#FF8C00] font-medium cursor-pointer hover:underline">Add Number</span>
                  </p>
                </div>

                {/* Info Item */}
                <div className="group">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <FaMapMarkerAlt /> Address
                  </div>
                  <p className="text-base font-semibold text-gray-800 bg-gray-50/50 p-3 rounded-xl border border-transparent group-hover:border-gray-100 transition-colors">
                    {user?.address || "No address saved"}
                    <span className="ml-2 text-xs text-[#FF8C00] font-medium cursor-pointer hover:underline">Add</span>
                  </p>
                </div>

              </div>
            </div>

            {/* Quick Links / Settings Menu */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-2">
                <Link to="/bookings" className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-[#FF8C00] flex items-center justify-center">
                      <FiClock size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Booking History</h4>
                      <p className="text-xs text-gray-500">View past and upcoming trips</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>

                <div className="mx-4 border-t border-gray-50"></div>

                <Link to="/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center">
                      <FiSettings size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Account Settings</h4>
                      <p className="text-xs text-gray-500">Password, notifications, and security</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}