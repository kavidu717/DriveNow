import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVehicleStore from "../Store/vehicleStore.js";
import toast, { Toaster } from "react-hot-toast";
import { 
  FiChevronLeft, 
  FiTag, 
  FiList, 
  FiCheckCircle, 
  FiXCircle, 
  FiInfo, 
  FiMap 
} from "react-icons/fi";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = useVehicleStore((state) => state.vehicle);
  const loading = useVehicleStore((state) => state.loading);
  const fetchVehicleById = useVehicleStore((state) => state.fetchVehicleById);
  const clearVehicle = useVehicleStore((state) => state.clearVehicle);

  // Booking States
  const [startDate, setStartDate] = useState("");
  const [estimatedKm, setEstimatedKm] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // 1. Fetch the vehicle data on mount
  useEffect(() => {
    fetchVehicleById(id);
    return () => clearVehicle();
  }, [id]);

  // 2. NEW: Listen for the vehicle data and set the default DB value
  useEffect(() => {
    if (vehicle) {
      // If the database has a defaultKm, use it. Otherwise, default to empty (or you can put a number like 50)
      setEstimatedKm(vehicle.defaultKm || "");
    }
  }, [vehicle]);

  const handleBooking = () => {
    if (!startDate) {
      toast.error("Please select a Pick-up date.");
      return;
    }
    if (!estimatedKm || Number(estimatedKm) <= 0) {
      toast.error("Please enter a valid estimated distance in km.");
      return;
    }

    setIsBooking(true);
    
    // Simulate API booking request
    setTimeout(() => {
      setIsBooking(false);
      toast.success("Vehicle booked successfully!");
      setTimeout(() => navigate("/"), 1500);
    }, 1500);
  };

  // Premium Skeleton Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-white shadow-sm border border-gray-100 flex flex-col lg:flex-row overflow-hidden animate-pulse">
          <div className="w-full lg:w-1/2 h-[300px] lg:h-[600px] bg-gray-200"></div>
          <div className="w-full lg:w-1/2 p-8 sm:p-12 space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="flex gap-4">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="space-y-3 pt-6">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-16 bg-gray-200 rounded-xl w-full mt-10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!vehicle) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <FiInfo className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Not Found</h2>
        <p className="text-gray-500 mb-6">The vehicle you are looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/vehicle')} className="bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e67e00] transition-all">
          Browse Vehicles
        </button>
      </div>
    );
  }

  // Calculate pricing based on km
  const baseRate = vehicle.pricePerKm 
  const kmToCalculate = Number(estimatedKm) > 0 ? Number(estimatedKm) : 0;
  const estimatedTotal = baseRate * kmToCalculate;

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        
        {/* Back Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-[#FF8C00] font-semibold mb-6 transition-colors w-fit"
        >
          <FiChevronLeft className="text-xl" />
          Back to Fleet
        </button>

        {/* Main Card Container */}
        <div className="bg-white shadow-sm border border-gray-100 flex flex-col lg:flex-row overflow-hidden">
          
          {/* IMAGE SECTION */}
          <div className="w-full lg:w-1/2 relative bg-gray-100">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-[350px] sm:h-[450px] lg:h-full object-cover object-center"
            />
            {/* Floating Availability Badge */}
            <div className="absolute top-6 left-6">
              {vehicle.availability ? (
                <span className="flex items-center gap-2 bg-green-50/90 backdrop-blur-md text-green-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-green-200">
                  <FiCheckCircle className="text-lg" /> Available
                </span>
              ) : (
                <span className="flex items-center gap-2 bg-red-50/90 backdrop-blur-md text-red-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-red-200">
                  <FiXCircle className="text-lg" /> Unavailable
                </span>
              )}
            </div>
          </div>

          {/* DETAILS & BOOKING SECTION */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col">
            
            {/* Title & Badges */}
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                {vehicle.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider">
                  <FiTag className="text-[#FF8C00]" /> {vehicle.brand}
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider">
                  <FiList className="text-[#FF8C00]" /> {vehicle.type}
                </span>
                {vehicle.model && (
                  <span className="bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold">
                    Model: {vehicle.model}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About this vehicle</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {vehicle.description || "Experience premium comfort and performance with this exceptional vehicle, perfectly maintained and ready for your next journey."}
              </p>
            </div>

            {/* INTEGRATED TRIP DETAILS (Per Km) */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-8 flex-1">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <FiMap className="text-[#FF8C00]" /> Trip Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Pick-up Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all"
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Est. Distance (km)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 50"
                    min="1"
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all"
                    value={estimatedKm}
                    onChange={(e) => setEstimatedKm(e.target.value)}
                  />
                </div>
              </div>

              {/* Dynamic Pricing Calculation */}
              <div className="flex justify-between items-end py-3 border-t border-gray-200 mt-2">
                <div>
                  <span className="text-gray-600 text-sm font-medium block">
                    Rs {baseRate} x {kmToCalculate || 0} km
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1 block">
                    Final price based on actual km
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Est. Total</span>
                  <span className="text-xl font-black text-gray-900">
                    Rs {estimatedTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Button */}
            <button 
              onClick={handleBooking}
              disabled={!vehicle.availability || isBooking}
              className="w-full bg-[#FF8C00] hover:bg-[#e67e00] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#FF8C00]/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none"
            >
              {isBooking ? "Processing..." : vehicle.availability ? "Confirm Booking" : "Currently Unavailable"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}