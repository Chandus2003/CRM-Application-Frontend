import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ name: "", email: "" });

  useEffect(() => {
    // Get admin info from localStorage
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (!adminData) {
      // If not logged in, redirect to login
      navigate("/login");
    } else {
      setAdmin({ name: adminData.name, email: adminData.email });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear admin info from localStorage
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white space-y-6">
      <h1 className="text-3xl font-bold">👑 Admin Dashboard</h1>
      <div className="text-lg">
        <p><strong>Name:</strong> {admin.name}</p>
        <p><strong>Email:</strong> {admin.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
