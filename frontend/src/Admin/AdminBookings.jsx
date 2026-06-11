import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBookings = async () => {
    try {
      const { data } = await API.get("/bookings");
      console.log("BOOKINGS API RESPONSE:", data);
      setBookings(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-orange-500"></div>
        <p className="text-slate-500 font-medium text-sm">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">All Bookings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all vehicle bookings
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">

          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">User</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Vehicle</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Start Date</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">KM</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Amount</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">

                {/* USER */}
                <td className="p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    {b.userId?.firstName} {b.userId?.lastName}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    {b.userId?.email}
                  </div>
                </td>

                {/* VEHICLE */}
                <td className="p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    {b.vehicleId?.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    {b.vehicleId?.brand}
                  </div>
                </td>

                {/* DATE */}
                <td className="p-4 text-sm text-slate-600 font-medium">
                  {new Date(b.startDate).toLocaleDateString()}
                </td>

                {/* KM */}
                <td className="p-4 text-sm text-slate-600 font-medium">
                  {b.estimatedKm} km
                </td>

                {/* AMOUNT */}
                <td className="p-4 text-sm font-bold text-slate-900">
                  Rs. {b.totalAmount}
                </td>

                {/* STATUS */}
                <td className="p-4 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize tracking-wide ${
                      b.status === "pending"
                        ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10"
                        : b.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10"
                        : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/10"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}