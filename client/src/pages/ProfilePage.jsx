import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit,
  FiSave,
  FiClock,
} from "react-icons/fi";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../config/axiosInstance";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fetch user data
  const [apiData, isLoading, error] = useFetch("/user/profile");
  const user = apiData?.user;

  // Update formData when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      const response = await axiosInstance.put("/user/update", formData);
      if (response.data) {
        setIsEditing(false);
        setFormData(response.data.user); // Update local state
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading profile</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>No user data found</p>
      </div>
    );
  }

  // Format join date
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gray-700 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-600 overflow-hidden border-2 border-amber-400">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex items-center text-gray-300 gap-1">
                <FiClock className="text-sm" />
                <span className="text-sm">Member since {joinDate}</span>
              </div>
            </div>
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="ml-auto bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              {isEditing ? (
                <>
                  <FiSave /> Save Changes
                </>
              ) : (
                <>
                  <FiEdit /> Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-amber-400 border-b border-gray-700 pb-2">
                  Personal Information
                </h2>

                <div className="flex items-start gap-4">
                  <FiUser className="text-amber-400 mt-1" />
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    ) : (
                      <p className="text-white">{user.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiMail className="text-amber-400 mt-1" />
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-amber-400 border-b border-gray-700 pb-2">
                  Contact Information
                </h2>

                <div className="flex items-start gap-4">
                  <FiPhone className="text-amber-400 mt-1" />
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    ) : (
                      <p className="text-white">
                        {user.phone || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order History Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-amber-400 border-b border-gray-700 pb-2 mb-4">
                Recent Orders
              </h2>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-center text-gray-400">
                  Your order history will appear here
                </p>
                {/* Map through actual orders here when implemented */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
