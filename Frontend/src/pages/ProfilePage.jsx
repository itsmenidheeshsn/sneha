import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiSave,
} from "react-icons/fi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch user data (simulated API call)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Replace with actual API call
        const mockUser = {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, Cityville",
          joinDate: "January 2023",
          avatar: "/default-avatar.png",
        };

        setUser(mockUser);
        setFormData({
          name: mockUser.name,
          email: mockUser.email,
          phone: mockUser.phone,
          address: mockUser.address,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user
    setUser((prev) => ({
      ...prev,
      ...formData,
    }));
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gray-700 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-600 overflow-hidden border-2 border-amber-400">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-300">Member since {user.joinDate}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
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
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    ) : (
                      <p className="text-white">{user.email}</p>
                    )}
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
                      <p className="text-white">{user.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiMapPin className="text-amber-400 mt-1" />
                  <div className="flex-1">
                    <label className="text-gray-400 text-sm">Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    ) : (
                      <p className="text-white">{user.address}</p>
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
