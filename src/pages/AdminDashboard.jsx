import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const adminData = JSON.parse(localStorage.getItem("user") || "{}");
      
      if (!adminData || adminData.role !== "admin") {
        navigate("/login");
      } else {
        setAdmin({ name: adminData.name || "", email: adminData.email || "" });
      }
    } catch (err) {
      console.error("Error parsing admin data:", err);
      setError("Invalid session data");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
      // Still navigate even if localStorage fails
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        <div className="flex items-center space-x-3 text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-r-2 border-blue-400"></div>
          <span className="text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        <div className="text-center space-y-4 bg-red-900/30 border border-red-500/50 rounded-xl p-8 backdrop-blur-sm">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-300 text-lg">Error: {error}</p>
          <button 
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-600/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <h1 className="text-2xl font-bold text-white">CloudCRM Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 shadow-2xl">
            <span className="text-3xl">👑</span>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Manage your CloudCRM system with powerful administrative tools
          </p>
        </div>

        {/* Admin Info Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-600/30 p-6 mb-8 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
              👤
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{admin.name || "Admin User"}</h2>
              <p className="text-slate-300">{admin.email || "admin@cloudcrm.com"}</p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-300 ml-2">Active Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => navigate("/admin/create-engineer")}
            className="group bg-slate-800/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-6 hover:bg-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                👷‍♂️
              </div>
              <div className="text-blue-400 group-hover:translate-x-1 transition-transform">→</div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Create Engineer</h3>
            <p className="text-slate-400 text-sm">Add new engineers to your team</p>
          </button>

          <button
            onClick={() => navigate("/admin/view-engineers")}
            className="group bg-slate-800/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-6 hover:bg-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                👥
              </div>
              <div className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Manage Engineers</h3>
            <p className="text-slate-400 text-sm">View and manage engineer accounts</p>
          </button>

          <button
            onClick={() => navigate("/admin/view-tickets")}
            className="group bg-slate-800/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-6 hover:bg-slate-700/50 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                🎫
              </div>
              <div className="text-blue-400 group-hover:translate-x-1 transition-transform">→</div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">Support Tickets</h3>
            <p className="text-slate-400 text-sm">Monitor customer support requests</p>
          </button>

          <button
            onClick={() => navigate("/admin/view-users")}
            className="group bg-slate-800/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-6 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                👤
              </div>
              <div className="text-slate-400 group-hover:translate-x-1 transition-transform">→</div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">User Management</h3>
            <p className="text-slate-400 text-sm">Manage all system users</p>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Engineers</p>
                <p className="text-white text-3xl font-bold">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-400 text-xl">👨‍💻</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-300 text-sm font-medium">Active Tickets</p>
                <p className="text-white text-3xl font-bold">18</p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <span className="text-cyan-400 text-xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-500/20 rounded-2xl p-6 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm font-medium">System Users</p>
                <p className="text-white text-3xl font-bold">156</p>
              </div>
              <div className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center">
                <span className="text-slate-400 text-xl">🏢</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400">
          <p className="text-sm">CloudCRM Admin Dashboard v2.0 • Secure Management Portal</p>
        </div>
      </div>
    </div>
  );
}