import useVehicleStore from "../Store/vehicleStore.js";
import { FiList, FiTag, FiFilter, FiRefreshCw } from "react-icons/fi";

export default function FilterBar() {
  const filters = useVehicleStore((state) => state.filters);
  const setFilters = useVehicleStore((state) => state.setFilters);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilter = () => {
    fetchVehicles();
  };

  const clearFilter = () => {
    setFilters({ type: "", brand: "" });
    fetchVehicles();
  };

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Type Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
          Vehicle Type
        </label>
        <div className="relative">
          <FiList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            name="type"
            placeholder="e.g. SUV, Sedan, Bike..."
            value={filters.type}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:bg-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Brand Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
          Brand Name
        </label>
        <div className="relative">
          <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            name="brand"
            placeholder="e.g. Toyota, BMW..."
            value={filters.brand}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:bg-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 space-y-3">
        <button
          onClick={applyFilter}
          className="w-full flex justify-center items-center gap-2 bg-[#FF8C00] hover:bg-[#e67e00] text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-[#FF8C00]/20 transition-all active:scale-[0.98]"
        >
          <FiFilter />
          Apply Filters
        </button>

        <button
          onClick={clearFilter}
          className="w-full flex justify-center items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 text-gray-500 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
        >
          <FiRefreshCw />
          Clear All
        </button>
      </div>
    </div>
  );
}