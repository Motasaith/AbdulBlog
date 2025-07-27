import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { 
  UserGroupIcon,
  TrashIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  UserIcon,
  StarIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // Decode token to get current admin ID
  const currentAdminId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin");
      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
      toast.error("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const deleteAdmin = async (id, username) => {
    if (!window.confirm(`Are you sure you want to delete admin "${username}"?`)) return;

    try {
      await api.delete(`/api/admin/${id}`);
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      toast.success(`Admin "${username}" deleted successfully`);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete admin");
    }
  };

  const handleRoleChange = async (adminId, newRole, username) => {
    if (!window.confirm(`Change "${username}" role to ${newRole}?`)) return;

    try {
      const res = await api.put(`/api/admin/${adminId}/role`, { role: newRole });
      setAdmins((prev) =>
        prev.map((admin) =>
          admin._id === adminId ? { ...admin, role: newRole } : admin
        )
      );
      toast.success(`Role changed to ${newRole} successfully`);
    } catch (err) {
      console.error("Role change error:", err.response?.data || err.message);
      toast.error("Failed to change role");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading admins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AbdulBlog
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link to="/blogs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blogs
              </Link>
              <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
              <UserGroupIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manage Admins
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                View and adjust admin roles and permissions
              </p>
            </div>
          </div>

          {/* Admins Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Change Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {admins.map((admin, index) => (
                  <tr key={admin._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {admin.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {admin.role === "admin" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200">
                          <StarIcon className="h-4 w-4 mr-1" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                          <ShieldCheckIcon className="h-4 w-4 mr-1" />
                          Editor
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {admin._id === currentAdminId ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                          You
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200">
                          Other
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {admin._id !== currentAdminId ? (
                        <select
                          value={admin.role}
                          onChange={(e) =>
                            handleRoleChange(admin._id, e.target.value, admin.username)
                          }
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                        </select>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Cannot change</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {admin._id !== currentAdminId && (
                        <button
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                          onClick={() => deleteAdmin(admin._id, admin.username)}
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageAdmins;
