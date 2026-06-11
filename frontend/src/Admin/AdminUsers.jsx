import { useEffect, useState } from "react";
import { HiTrash, HiBan} from "react-icons/hi";
import API from "../api/axios.js";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const { data } = await API.get("/auth");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-orange-500"></div>
        <p className="text-slate-500 font-medium text-sm">Loading Users...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">All Users</h1>
        <p className="text-sm text-slate-500 mt-1">Manage platform accounts, update statuses, or delete users.</p>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Name</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Email</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Role</th>
              <th className="p-4 font-semibold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-sm font-medium text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm border border-orange-100">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                    <span>{user.firstName} {user.lastName}</span>
                  </div>
                </td>

                <td className="p-4 text-sm text-slate-600">
                  {user.email}
                </td>

                <td className="p-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                    user.role === "admin" 
                      ? "bg-orange-50 text-orange-700 ring-1 ring-orange-600/10" 
                      : "bg-slate-50 text-slate-700 ring-1 ring-slate-600/10"
                  }`}>
                    {user.role}
                  </span>
                </td>

                <td className="p-4 text-sm text-right">
                  <div className="inline-flex items-center gap-2">
                    {/* Block/Unblock Action Placeholder Button */}
                    <button 
                      title="Toggle Block Status" 
                      className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-rose-600 transition-colors"
                    >
                      <HiBan size={16} />
                    </button>
                    
                    {/* Delete Action Placeholder Button */}
                    <button 
                      title="Delete User" 
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