import { useEffect, useState } from "react";
import FilterBar from "../Components/FilterBar";
import useVehicleStore from "../Store/vehicleStore";
import { FiSliders, FiHeart, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi"; 
import { Link } from "react-router-dom";

export default function Vehicles() {
  const vehicles = useVehicleStore((state) => state.vehicles);
  const loading = useVehicleStore((state) => state.loading);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileFilterOpen]);

  return (
    <div className="min-h-screen w-full flex bg-gray-50 relative">
      
      {/* Desktop Sidebar (Hidden on mobile) */}
      <aside className="w-1/4 max-w-xs min-w-[260px] bg-white border-r border-gray-100 hidden md:block">
        <div className="sticky top-20 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <FiSliders className="text-[#FF8C00] text-lg" />
            <h3 className="font-bold text-gray-900 tracking-tight">Filter Options</h3>
          </div>
          <FilterBar />
        </div>
      </aside>

      {/* --- SLIDING MOBILE DRAWER --- */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isMobileFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileFilterOpen(false)}
      ></div>
      
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FiSliders className="text-[#FF8C00] text-lg" />
            <h3 className="font-bold text-gray-900">Filters</h3>
          </div>
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
          >
            <FiX className="text-xl" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <FilterBar />
        </div>
      </div>
      {/* ------------------------------------- */}

      {/* Right Content Area: Vehicle Grid */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Explore Our Fleet
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {vehicles?.length || 0} premium vehicles available for your next journey.
            </p>
          </div>

          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 active:scale-95 transition-all w-full justify-center sm:w-auto"
          >
            <FiSliders className="text-[#FF8C00]" />
            Filters
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl animate-pulse p-4 flex flex-col justify-between">
                <div className="bg-gray-200 aspect-video rounded-xl w-full"></div>
                <div className="space-y-3 mt-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-lg w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Dynamic Vehicle Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {vehicles.map((v) => (
              <div
                key={v._id}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Fixed Image Container via Aspect Ratio */}
                <div className="relative bg-gray-100 w-full aspect-[16/10] sm:aspect-video overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    {v.availability ? (
                      <span className="flex items-center gap-1.5 bg-green-50/90 backdrop-blur-sm text-green-700 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm border border-green-100">
                        <FiCheckCircle /> Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 bg-red-50/90 backdrop-blur-sm text-red-700 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm border border-red-100">
                        <FiXCircle /> Booked
                      </span>
                    )}
                  </div>

                  {/* Favorite Button Overlay */}
                  <button className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-white shadow-sm transition-all">
                    <FiHeart className="text-xs" />
                  </button>
                </div>

                {/* Info Text Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">
                      <span>{v.brand}</span>
                      <span>•</span>
                      <span>{v.type}</span>
                    </div>
                    
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#FF8C00] transition-colors truncate">
                      {v.name}
                    </h3>
                    
                    <p className="text-gray-400 text-xs mt-0.5">Model Year: {v.model || "N/A"}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Rate</span>
                      <span className="text-base sm:text-lg font-black text-gray-900 truncate block">
                        Rs {v.pricePerKm}
                        <span className="text-xs font-normal text-gray-500"> /km</span>
                      </span>
                    </div>

                    <Link to={`/vehicle/${v._id}`} 
                      disabled={!v.availability}
                      className="bg-[#FF8C00] hover:bg-[#e67e00] text-white px-3 sm:px-4 py-2 rounded-xl font-bold text-xs shadow-md shadow-[#FF8C00]/10 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap"
                    >
                      Rent Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}