import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX,
} from "react-icons/fi";

const UserNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success(response?.data?.message || "Logout success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <nav className="top-0 left-0 w-full h-20 bg-gray-800 flex justify-between p-5 items-center z-50">
        <div className="mr-5">
          <Link to="/home">
            <img src="/logo.png" alt="logo" className="lg:h-[50px] h-[30px]" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-20 justify-between items-center">
          <ul className="flex gap-8 text-white">
            <li className="text-md font-semibold cursor-pointer hover:text-amber-300">
              <Link to="/home">Home</Link>
            </li>
            <li className="text-md font-semibold cursor-pointer hover:text-amber-300">
              <Link to="/about">About</Link>
            </li>
            <li className="text-md font-semibold cursor-pointer hover:text-amber-300">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Desktop User Controls */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-5 text-white">
            <Link to="/cart" className="relative group">
              <FiShoppingCart className="text-2xl cursor-pointer hover:text-amber-300" />
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

        {/* Mobile Hamburger Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <FiShoppingCart className="text-2xl text-white cursor-pointer hover:text-amber-300" />
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 w-full px-5 pb-5 flex flex-col gap-4 z-40">
          <Link
            to="/home"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
          <div className="border-t border-gray-700 pt-4 mt-2">
            <Link
              to="/profile"
              className="block text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
              onClick={toggleMobileMenu}
            >
              Profile
            </Link>
            <Link
              to="/orders"
              className="block text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
              onClick={toggleMobileMenu}
            >
              Orders
            </Link>
            <button
              className="block w-full text-left text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
