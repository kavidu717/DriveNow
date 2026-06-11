import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiTruck, HiUsers, HiLightningBolt, HiPlus, HiCog, HiCollection } from "react-icons/hi";
import API from "../api/axios";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const [vehicleRes, userRes] = await Promise.all([
        API.get("/vehicles"),
        API.get("/auth"),
      ]);

      setVehicles(vehicleRes.data.data);
      setUsers(userRes.data.users);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-orange-500"></div>
        <p className="text-slate-500 font-medium text-sm">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Overview of system activity and operational metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Vehicles</h2>
            <p className="text-3xl font-bold text-slate-900 mt-1">{vehicles.length}</p>
          </div>
          <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100">
            <HiTruck size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Users</h2>
            <p className="text-3xl font-bold text-slate-900 mt-1">{users.length}</p>
          </div>
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
            <HiUsers size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active System</h2>
            <p className="text-3xl font-bold text-emerald-600 mt-1">Online</p>
          </div>
          <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 animate-pulse">
            <HiLightningBolt size={24} />
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-4">Quick Actions</h2>

        <div className="flex gap-3 flex-wrap">

          <button
            onClick={() => navigate("/admin/vehicles")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] transition-all"
          >
            <HiPlus size={16} />
            <span>Add Vehicle</span>
          </button>

          <button
            onClick={() => navigate("/admin/vehicles/all")}
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold text-sm py-2.5 px-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all"
          >
            <HiCog size={16} />
            <span>Manage Vehicles</span>
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold text-sm py-2.5 px-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            <HiUsers size={16} />
            <span>Manage Users</span>
          </button>

        </div>
      </div>

      {/* Recent Vehicles */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <HiCollection className="text-slate-400" size={20} />
          <h2 className="text-base font-bold text-slate-900">Recent Vehicles</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Name</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Brand</th>
                <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Price/km</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {vehicles.slice(0, 5).map((v) => (
                <tr key={v._id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="p-4 text-sm font-semibold text-slate-900">{v.name}</td>
                  <td className="p-4 text-sm text-slate-600">{v.brand}</td>
                  <td className="p-4 text-sm font-bold text-slate-900">Rs. {v.pricePerKm}</td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-slate-400 text-sm">
                    No matching vehicles logs registered.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}