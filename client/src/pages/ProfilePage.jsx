import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit,
  FiSave,
  FiClock,
  FiMapPin,
  FiTrash,
  FiPlus,
} from "react-icons/fi";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddressForm = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    address || {
      name: "",
      houseName: "",
      streetName: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
      <h3 className="text-xl font-medium mb-4 text-white">
        {address ? "Edit Address" : "Add New Address"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-amber-500"
              required
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-amber-500"
              required
              placeholder="Enter phone number"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm mb-1">
              House/Flat No.
            </label>
            <input
              type="text"
              name="houseName"
              value={formData.houseName}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-amber-500"
              required
              placeholder="Enter house/flat number"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm mb-1">
              Street Address
            </label>
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-amber-500"
              required
              placeholder="Enter street address"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm mb-1">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-amber-500"
              placeholder="Nearby landmark (optional)"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-amber-500"
              required
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-amber-500"
              required
              placeholder="Enter state"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-1">PIN Code</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-amber-500"
              required
              placeholder="Enter PIN code"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded transition"
          >
            <FiSave /> Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [address, setAddress] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);

  // Fetch user data
  const [apiData, isLoading, error] = useFetch("/user/profile");
  const user = apiData?.user;

  // Fetch address data
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axiosInstance.get("/address/get");
        setAddress(response.data.address);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setIsLoadingAddress(false);
      }
    };

    if (user) {
      fetchAddress();
    }
  }, [user]);

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

  // Save address changes
  const handleSaveAddress = async (formData) => {
    try {
      setIsLoadingAddress(true);
      const response = address
        ? await axiosInstance.put("/address/update/new", formData)
        : await axiosInstance.post("/address/create", formData);
      setAddress(response.data.address);
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // Delete address
  const handleDeleteAddress = async () => {
    try {
      setIsLoadingAddress(true);
      await axiosInstance.delete(`/address/delete/${address._id}`);
      setAddress(null);
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsLoadingAddress(false);
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

            {/* Address Section */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-amber-400 border-b border-gray-700 pb-2">
                  Shipping Address
                </h2>
                {!isEditingAddress && address && (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded transition"
                  >
                    <FiEdit /> Edit Address
                  </button>
                )}
              </div>

              {isEditingAddress || !address ? (
                <AddressForm
                  address={address}
                  onSave={handleSaveAddress}
                  onCancel={() => setIsEditingAddress(false)}
                />
              ) : (
                <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
                  <div className="flex items-start mb-4">
                    <FiMapPin className="text-amber-500 text-xl mr-3 mt-1" />
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {address.name}
                      </h3>
                      <p className="text-gray-400">{address.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-300">
                    <p>
                      {address.houseName}, {address.streetName}
                    </p>
                    {address.landmark && <p>Near {address.landmark}</p>}
                    <p>
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={handleDeleteAddress}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition"
                    >
                      <FiTrash /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order History Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-amber-400 border-b border-gray-700 pb-2 mb-4">
                Recent Orders
              </h2>
              <div className="bg-gray-700 rounded-lg p-4">
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
