import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import useVehicleStore from "../Store/vehicleStore.js";

export default function LatestVehicles() {
  const latestVehicles = useVehicleStore((state) => state.latestVehicles);
  const loading = useVehicleStore((state) => state.loading);
  const fetchLatestVehicles = useVehicleStore((state) => state.fetchLatestVehicles);

  useEffect(() => {
    fetchLatestVehicles();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Latest Additions
            </h2>
            <p className="text-gray-500 mt-2">
              Discover our newest premium vehicles ready for your next journey.
            </p>
          </div>
          <Link 
            to="/vehicle" 
            className="hidden sm:inline-flex items-center text-[#FF8C00] font-bold hover:text-orange-600 transition-colors"
          >
            View All Vehicles <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl animate-pulse p-4 h-80">
                <div className="bg-gray-200 aspect-video rounded-xl w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Vehicle Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestVehicles.map((v) => (
              <div
                key={v._id}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative bg-gray-100 w-full aspect-video overflow-hidden">
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
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">
                      <span>{v.brand}</span>
                      <span>•</span>
                      <span>{v.type}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#FF8C00] transition-colors truncate">
                      {v.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Rate</span>
                      <span className="text-lg font-black text-gray-900 block">
                        Rs {v.pricePerKm}
                        <span className="text-xs font-normal text-gray-500"> /km</span>
                      </span>
                    </div>

                    <Link to={`/vehicle/${v._id}`} 
                      className="bg-gray-900 hover:bg-[#FF8C00] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors active:scale-95"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link 
            to="/vehicle" 
            className="inline-block bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-xl transition-colors w-full"
          >
            View All Vehicles
          </Link>
        </div>

      </div>
    </section>
  );
}