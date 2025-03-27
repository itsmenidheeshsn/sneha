import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import {
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const UserNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleLogout = () => {
    try {
      const response = axiosInstance.post("/user/logout");
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <nav className="top-0 left-0 w-full h-20 bg-gray-800  flex justify-between p-5 items-center z-50">
        <div className="mr-5">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="hidden lg:flex gap-20 justify-between items-center">
          <ul className="flex gap-8 text-white">
            <li className="text-md font-semibold cursor-pointer hover:text-amber-300">
              <Link to="/home">Home</Link>
            </li>
            <li className="text-md font-semibold cursor-pointer hover:text-amber-300">
              <Link to="/about">About</Link>
            </li>
            <li className="text-md font-semibold cursor-pointer hover:text-amber-300">
              <Link to="/menu">Menu</Link>
            </li>
            <li className="text-md font-semibold cursor-pointer hover:text-amber-300">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5 text-white">
            <Link to="/cart" className="relative group">
              <FiShoppingCart className="text-2xl cursor-pointer hover:text-amber-300" />
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <div className="relative group">
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-amber-300"
                onClick={toggleProfileMenu}
              >
                <FiUser className="text-2xl" />
                {isProfileOpen ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => {
                          handleLogout();
                          console.log("Signing out...");
                          setIsProfileOpen(false);
                        }}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
