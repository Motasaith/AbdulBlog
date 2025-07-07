import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ManageAdmins.css";

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  // Decode token to get current admin ID
  const currentAdminId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  // 🔄 Fetch all admins
  const fetchAdmins = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admins`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAdmins(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🗑 Delete admin
  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
    } catch (err) {
      alert("Failed to delete admin");
    }
  };

  // 🔁 Change admin role
  const handleRoleChange = async (adminId, newRole) => {
    if (!window.confirm(`Are you sure you want to change role to ${newRole}?`))
      return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/admins/${adminId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      alert(res.data.message);
      setAdmins((prev) =>
        prev.map((admin) =>
          admin._id === adminId ? { ...admin, role: newRole } : admin
        )
      );
    } catch (err) {
      console.error("Role change error:", err.response?.data || err.message);
      alert("Failed to change role");
    }
  };

  return (
    <div className="container">
      <h2 className="dashboard-title">Manage Admins</h2>

      {loading ? (
        <p>Loading admins...</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Change Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin._id}>
                  <td>{index + 1}</td>
                  <td>{admin.username}</td>
                  <td>{admin.role}</td>
                  <td>
                    {admin._id === currentAdminId ? (
                      <span className="badge badge-you">You</span>
                    ) : (
                      <span className="badge badge-other">Other</span>
                    )}
                  </td>
                  <td>
                    {admin._id !== currentAdminId ? (
                      <select
                        value={admin.role}
                        onChange={(e) =>
                          handleRoleChange(admin._id, e.target.value)
                        }
                      >
                        <option value="admin">admin</option>
                        <option value="editor">editor</option>
                      </select>
                    ) : (
                      <em>Cannot change</em>
                    )}
                  </td>
                  <td>
                    {admin._id !== currentAdminId && (
                      <button
                        className="btn-delete"
                        onClick={() => deleteAdmin(admin._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
