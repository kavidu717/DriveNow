import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiMapPin, FiDollarSign, FiArrowLeft, FiShield, FiCheck } from "react-icons/fi";

export default function Checkout() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("pendingBooking");

    if (!data) {
      navigate("/vehicles");
      return;
    }

    // ස්මූත් ට්‍රාන්සිශන් එකක් සඳහා කුඩා ප්‍රමුඛ ප්‍රවේශ කාලයක් (Delay) ලබා දී ඇත
    const timer = setTimeout(() => {
      setBooking(JSON.parse(data));
      setIsLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleConfirm = () => {
    console.log("Confirmed booking:", booking);
    // ඊළඟ payment පිටුවට යෑම සඳහා දත්ත තාවකාලිකව තබාගෙන navigate කරවයි
    navigate("/payment");
  };

  if (isLoading || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-500 font-medium tracking-wide animate-pulse">Preparing your order summary...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Header & Stepper Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium w-fit group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>

          {/* Checkout Steps */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <span className="text-green-600 flex items-center gap-1">
              <FiCheck className="stroke-[3]" /> Details
            </span>
            <span className="text-gray-300">————</span>
            <span className="text-orange-600 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100 shadow-sm">Checkout</span>
            <span className="text-gray-300">————</span>
            <span className="text-gray-400">Payment</span>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Booking Overview & Policy Cards (8 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-gray-50">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Review Reservation</h2>
                <p className="text-sm text-gray-400 mt-1">Please confirm your selection details before proceeding.</p>
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                {/* Product Image Container */}
                <div className="w-full sm:w-2/5 h-40 bg-gray-50 rounded-2xl overflow-hidden relative border shadow-inner">
                  <img
                    src={booking.vehicleImage || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600"}
                    alt={booking.vehicleName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                {/* Core Specifications */}
                <div className="w-full sm:w-3/5 flex flex-col justify-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 w-fit mb-2">
                    Selected Model
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">{booking.vehicleName}</h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Base Rate: <span className="text-gray-900 font-bold">Rs {booking.pricePerKm?.toLocaleString()}</span> per km
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Trust Statement Box */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600 shrink-0">
                <FiShield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900">Protected Booking Guarantee</h4>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                  Your rental transaction includes comprehensive basic insurance cover. Changes or cancellation can be managed free of charge up to 24 hours prior.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary Panel (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xl shadow-gray-200/40">
              <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Cost Breakdown</h3>
              
              {/* Line items list */}
              <div className="space-y-4 mb-6 border-b border-gray-100 pb-6 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-400 font-medium">
                    <FiCalendar className="text-gray-400" /> Date
                  </span>
                  <span className="font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border">{booking.startDate}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-gray-400 font-medium">
                    <FiMapPin className="text-gray-400" /> Distance Fixed
                  </span>
                  <span className="font-semibold text-gray-900">{booking.estimatedKm} km</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span>Subtotal Cost</span>
                  <span className="font-semibold text-gray-900">Rs {(booking.pricePerKm * booking.estimatedKm)?.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Local VAT & Fees</span>
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">Included</span>
                </div>
              </div>

              {/* Grand Total Frame */}
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-extrabold">Total Amount</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-medium">All inclusive price</p>
                </div>
                <div className="text-3xl font-black text-gray-900 tracking-tight flex items-baseline gap-0.5">
                  <span className="text-lg font-bold mr-1">Rs</span>
                  {booking.totalAmount?.toLocaleString()}
                </div>
              </div>

              {/* Action Buttons Stack */}
              <button
                onClick={handleConfirm}
                className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-orange-500/25 active:scale-[0.98]"
              >
                <span>Confirm & Proceed</span>
                <FiDollarSign className="w-5 h-5" />
              </button>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}