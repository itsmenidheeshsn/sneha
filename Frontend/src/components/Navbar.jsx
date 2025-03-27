import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <div>
      <nav className="top-0 left-0 w-full h-20 bg-gray-800 flex justify-between p-5 items-center z-50">
        <div className="mr-5">
          <Link to={"/"}>
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5 text-white"></div>
          <div className="lg:flex gap-5">
            <Link to={"/login"}>
              <button className="bg-white text-gray-800 px-5 py-2 font-semibold transition rounded-lg duration-300 ease-in-out hover:bg-gray-300 hover:scale-105">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="border border-white text-white px-5 py-2 font-semibold rounded-lg cursor-pointer hover:opacity-80">
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
