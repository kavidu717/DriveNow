import { useEffect, useState } from "react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getVehicles = async () => {
    try {
      const { data } = await API.get("/vehicles");

      setVehicles(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

 

const deleteVehicle = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this vehicle?"
  );

  if (!confirmDelete) return;

  try {
    const { data } = await API.delete(`/vehicles/${id}`);

    setVehicles((prev) =>
      prev.filter((vehicle) => vehicle._id !== id)
    );

    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete vehicle");
  }
};

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-orange-500"></div>
        <p className="text-slate-500 font-medium text-sm">Loading Vehicles...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">All Vehicles</h1>
        <p className="text-sm text-slate-500 mt-1">Manage and update your active fleet inventory records.</p>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Image</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Name</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Type</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Brand</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Model</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Price/KM</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Availability</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-4">
                  <div className="h-12 w-16 overflow-hidden bg-slate-100 border border-slate-200/60 shrink-0">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                <td className="p-4 text-sm font-semibold text-slate-900">
                  {vehicle.name}
                </td>

                <td className="p-4 text-sm text-slate-600 capitalize">
                  {vehicle.type}
                </td>

                <td className="p-4 text-sm text-slate-600">
                  {vehicle.brand}
                </td>

                <td className="p-4 text-sm text-slate-600">
                  {vehicle.model}
                </td>

                <td className="p-4 text-sm font-bold text-slate-900">
                  Rs. {vehicle.pricePerKm}
                </td>

                <td className="p-4 text-sm">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      vehicle.availability
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10"
                        : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/10"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${vehicle.availability ? "bg-emerald-600" : "bg-rose-600"}`} />
                    {vehicle.availability ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="p-4 text-sm text-right">
                  <div className="inline-flex items-center gap-2">
                    {/* Update / Edit Action Button */}
                    <button 
                      onClick={() => navigate(`/admin/vehicle/${vehicle._id}`)}
                      type="button"
                      title="Update Vehicle"
                      className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-orange-600 hover:border-orange-200 transition-colors"
                    >
                      <HiPencilAlt size={16} />
                    </button>

                    {/* Delete Action Button */}
                    <button 
                      onClick={() => deleteVehicle(vehicle._id)}
                      type="button"
                      title="Delete Vehicle"
                      className="p-2 rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                    >
                      <HiTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}