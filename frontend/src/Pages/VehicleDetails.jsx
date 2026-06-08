import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useVehicleStore from "../Store/vehicleStore.js";

export default function VehicleDetails() {
  const { id } = useParams();

  const vehicle = useVehicleStore((state) => state.vehicle);
  const loading = useVehicleStore((state) => state.loading);
  const fetchVehicleById = useVehicleStore(
    (state) => state.fetchVehicleById
  );
  const clearVehicle = useVehicleStore(
    (state) => state.clearVehicle
  );

  useEffect(() => {
    fetchVehicleById(id);

    return () => clearVehicle();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!vehicle) {
    return <p className="p-6">No vehicle found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-2 gap-10">
      
      {/* IMAGE */}
      <div>
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {vehicle.name}
        </h1>

        <p className="mb-2">Brand: {vehicle.brand}</p>
        <p className="mb-2">Type: {vehicle.type}</p>

        <p className="text-gray-600 mb-4">
          {vehicle.description}
        </p>

        <h2 className="text-xl font-bold text-orange-500 mb-4">
          ${vehicle.price} / day
        </h2>

        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
          Book Now
        </button>
      </div>
    </div>
  );
}