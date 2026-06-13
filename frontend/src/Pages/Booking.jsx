import  { useEffect, useState } from "react";
import API from "../api/axios";
import {  FiCalendar, FiChevronRight } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const { data } = await API.get("/bookings/my-bookings");
        setBookings(data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  // Status එකට පාට දාගන්න helper එකක්
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "bg-green-50 text-green-700 border-green-100";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-100";
      case "cancelled": return "bg-red-50 text-red-700 border-red-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-400 animate-pulse">Loading your history...</div>;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-gray-900">Booking History</h2>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{bookings.length} Total</span>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 font-medium">No booking history found.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="group relative bg-gray-50/50 hover:bg-white p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Left: Info */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
                  <img src={booking.vehicleId?.image} alt={booking.vehicleId?.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-base">{booking.vehicleId?.name}</h4>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase mt-1">
                    <span className="flex items-center gap-1"><FaCarSide /> {booking.vehicleId?.brand}</span>
                    <span className="flex items-center gap-1"><FiCalendar /> {new Date(booking.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Right: Status & Price */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <p className="text-lg font-black text-gray-900">Rs {booking.totalAmount}</p>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase ${getStatusStyles(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:bg-[#FF8C00] group-hover:text-white transition-colors">
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}