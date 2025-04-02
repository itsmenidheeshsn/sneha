import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Hero Section */}
      <div className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-amber-300 max-w-2xl mx-auto">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-amber-300">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
              >
                Send Message
              </button>

              {submitted && (
                <div className="mt-4 p-4 bg-green-800 text-green-100 rounded-md border border-green-700">
                  <p className="font-medium">Thank you for your message!</p>
                  <p className="text-sm mt-1">We'll get back to you soon.</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-amber-300">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-amber-300">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-amber-300">
                      Email
                    </h3>
                    <p className="text-gray-300 hover:text-amber-300 transition duration-300">
                      <a href="mailto:contact@example.com">
                        contact@example.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-amber-300">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-amber-300">
                      Phone
                    </h3>
                    <p className="text-gray-300 hover:text-amber-300 transition duration-300">
                      <a href="tel:+15551234567">+1 (555) 123-4567</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-amber-300">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-amber-300">
                      Address
                    </h3>
                    <p className="text-gray-300">123 Restaurant Street</p>
                    <p className="text-gray-300">Food City, FC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-amber-300">
                Opening Hours
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-gray-700 pb-3">
                  <span className="text-gray-300">Saturday</span>
                  <span className="font-medium">10:00 AM - 11:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Sunday</span>
                  <span className="font-medium">10:00 AM - 9:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
