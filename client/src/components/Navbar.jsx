import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="top-0 left-0 w-full h-20 bg-gray-800 flex justify-between p-5 items-center z-50">
        <div className="mr-5">
          <Link to={"/"}>
            <img src="/logo.png" alt="logo" className=" lg:h-[50px] h-[30px]" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5">
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

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 w-full px-5 pb-5 flex flex-col gap-4">
          <Link
            to={"/login"}
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
