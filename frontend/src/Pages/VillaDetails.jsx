import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVehicleStore from "../Store/vehicleStore.js";
import { FiCheckCircle, FiXCircle, FiCalendar, FiMap } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import useBookingStore from "../Store/bookingStore.js";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicles = useVehicleStore((state) => state.vehicles);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);

  const setBooking = useBookingStore((state) => state.setBooking);

  // State for booking details
  const [startDate, setStartDate] = useState("");
  
  // Fixed distance constant 
  const estimatedKm = 50;

  
  useEffect(() => {
    if (!vehicles || vehicles.length === 0) {
      fetchVehicles();
    }
  }, [vehicles, fetchVehicles]);

 
  const vehicle = vehicles?.find((v) => v._id === id);

  const handleProceed = () => {
    if (!startDate) {
      toast.error("Please select a pick-up date.");
      return;
    }

    const bookingData = {
    userId: "TEMP_USER_ID",
    vehicleId: vehicle._id,
    vehicleName: vehicle.name,
    vehicleImage: vehicle.image,
    pricePerKm: vehicle.pricePerKm,
    startDate,
    estimatedKm,
    totalAmount: vehicle.pricePerKm * estimatedKm,
  };

  setBooking(bookingData);

  navigate("/checkout");
    
  };

  // වාහනයේ විස්තර ලෝඩ් වෙනකම් Spinner එක පෙන්වනවා
  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium w-fit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Fleet
        </button>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden grid md:grid-cols-2 gap-0">
          
          {/* Left Side: Image, Description & Basic Info */}
          <div className="flex flex-col h-full">
            <div className="h-64 md:h-80 bg-gray-200 relative">
              <img
                src={vehicle.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600"}
                alt={vehicle.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8 bg-gray-50 flex-grow border-r border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  {vehicle.name}
                </h1>
                {vehicle.availability ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold shrink-0">
                    <FiCheckCircle /> Available
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold shrink-0">
                    <FiXCircle /> Booked
                  </span>
                )}
              </div>

              <p className="text-gray-500 font-medium mb-4">
                {vehicle.brand} • {vehicle.type}
              </p>

              {/* Description Section */}
              <div className="mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {vehicle.description || "No specific details have been provided for this listing yet."}
                </p>
              </div>

              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-500">Model Year</span>
                  <span className="font-semibold text-gray-900">{vehicle.model || "N/A"}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-500">Rate per KM</span>
                  <span className="font-bold text-orange-600">Rs {vehicle.pricePerKm}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="p-8 flex flex-col justify-between bg-white">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Setup your booking</h3>

              {/* Date Picker */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiCalendar className="text-orange-500" />
                  Pick-up Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white shadow-sm"
                />
              </div>

              {/* Distance Input (Fixed to 50KM) */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiMap className="text-orange-500" />
                  Estimated Distance (KM)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={estimatedKm}
                    readOnly
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed outline-none shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    km
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  The standard booking distance is fixed at 50 km.
                </p>
              </div>
            </div>

            {/* Actions Section */}
            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={handleProceed}
                disabled={!vehicle.availability}
                className={`w-full text-center px-4 py-4 rounded-xl font-bold text-white transition-all shadow-md ${
                  vehicle.availability
                    ? "bg-[#FF8C00] hover:bg-[#e67e00] hover:shadow-lg active:scale-[0.98]"
                    : "bg-gray-300 pointer-events-none text-gray-500 shadow-none"
                }`}
              >
                {vehicle.availability ? "Go to Checkout" : "Vehicle Unavailable"}
              </button>
              <p className="text-center text-sm text-gray-400 mt-4 font-medium">
                You won't be charged yet. Total price will be calculated at checkout.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}