import { useEffect, useState } from "react";
import FilterBar from "../Components/FilterBar";
import useVehicleStore from "../Store/vehicleStore";
import { FiSliders, FiHeart, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi"; 

export default function Vehicles() {
  const vehicles = useVehicleStore((state) => state.vehicles);
  const loading = useVehicleStore((state) => state.loading);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);

  // State to manage the mobile filter drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

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

      {/* --- MOBILE FILTER DRAWER --- */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          {/* Dark Overlay Background */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>
          
          {/* Sliding Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl h-full animate-slide-in-right">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FiSliders className="text-[#FF8C00] text-lg" />
                <h3 className="font-bold text-gray-900">Filters</h3>
              </div>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            {/* Drawer Content */}
            <div className="p-6 overflow-y-auto">
              <FilterBar />
            </div>
          </div>
        </div>
      )}
      {/* --------------------------- */}

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

          {/* Mobile Filter Trigger Button (Hidden on Desktop) */}
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 active:scale-95 transition-all w-full justify-center sm:w-auto"
          >
            <FiSliders className="text-[#FF8C00]" />
            Filters
          </button>
        </div>

        {/* Loading State Skeleton Layout */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl h-[380px] animate-pulse p-4 flex flex-col justify-between">
                <div className="bg-gray-200 h-44 rounded-xl w-full"></div>
                <div className="space-y-3 mt-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-lg w-full mt-auto"></div>
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
                {/* Image Section */}
                <div className="relative bg-gray-100 h-44 overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    {v.availability ? (
                      <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-green-100">
                        <FiCheckCircle /> Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-red-100">
                        <FiXCircle /> Booked
                      </span>
                    )}
                  </div>

                  {/* Favorite Button Overlay */}
                  <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-white shadow-sm transition-all">
                    <FiHeart className="text-sm" />
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
                    
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#FF8C00] transition-colors truncate">
                      {v.name}
                    </h3>
                    
                    <p className="text-gray-400 text-xs mt-0.5">Model Year: {v.model || "N/A"}</p>
                  </div>

                  {/* Pricing / Call to Action Action Row */}
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 font-medium block">Daily Rate</span>
                      <span className="text-xl font-black text-gray-900">Rs{v.pricePerKm}<span className="text-xs font-normal text-gray-500"></span></span>
                    </div>

                    <button 
                      disabled={!v.availability}
                      className="bg-[#FF8C00] hover:bg-[#e67e00] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-[#FF8C00]/10 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Rent Now
                    </button>
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