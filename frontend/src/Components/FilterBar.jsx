import useVehicleStore from "../Store/vehicleStore.js";

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
    <div className="p-4 text-white">
      <h1 className="font-bold mb-4">Filters</h1>

      <input
        name="type"
        placeholder="Type (car, bike...)"
        value={filters.type}
        onChange={handleChange}
        className="p-2 text-black rounded mb-2 w-full"
      />

      <input
        name="brand"
        placeholder="Brand"
        value={filters.brand}
        onChange={handleChange}
        className="p-2 text-black rounded mb-2 w-full"
      />

      <button
        onClick={applyFilter}
        className="bg-black text-white w-full py-2 rounded mb-2"
      >
        Apply
      </button>

      <button
        onClick={clearFilter}
        className="bg-white text-black w-full py-2 rounded"
      >
        Clear
      </button>
    </div>
  );
}