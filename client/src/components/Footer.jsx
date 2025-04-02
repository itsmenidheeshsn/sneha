import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-300">CraveX</h3>
            <p className="text-gray-300">
              Delivering exceptional experiences through quality products and
              outstanding service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-amber-300 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-amber-300 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-amber-300 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-amber-300 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-300 transition-colors"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-amber-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-300">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>123 Cravex Street</p>
              <p>Food City, FC 12345</p>
              <p>Email: info@cravex.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-300">Newsletter</h3>
            <p className="text-gray-300">
              Subscribe to get updates on new products and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l focus:outline-none focus:ring-2 focus:ring-amber-300 text-gray-800"
              />
              <button className="bg-amber-300 text-gray-800 px-4 py-2 rounded-r font-medium hover:bg-amber-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CraveX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
