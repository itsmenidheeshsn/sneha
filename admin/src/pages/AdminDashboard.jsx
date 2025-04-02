import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiClipboard,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/admin/logout");
      console.log("logout response======", response);
      toast.success(response?.data?.message || "logout successful");
      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 100);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-5 fixed inset-0">
        <div className="text-2xl font-bold mb-10">Admin Panel</div>
        <nav className="flex flex-col gap-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 text-lg hover:text-amber-300"
          >
            <FiHome /> Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 text-lg hover:text-amber-300"
          >
            <FiClipboard /> Orders
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 text-lg hover:text-amber-300"
          >
            <FiUsers /> Users
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-2 text-lg hover:text-amber-300"
          >
            <FiSettings /> Restaurants
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-lg hover:text-red-400 mt-auto"
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-5">
        {/* Your content will go here */}
        <h1 className="text-3xl font-semibold">Welcome to Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
