import React from "react";
import {
  FiClock,
  FiStar,
  FiTruck,
  FiShield,
  FiPocket,
  FiHeart,
} from "react-icons/fi";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-amber-400">Cravex</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your fastest gateway to premium food delivery from top-rated
            restaurants
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-amber-400">
            How Cravex Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiStar className="text-3xl mb-4 text-amber-400" />,
                title: "Browse Restaurants",
                desc: "Discover top-rated eateries in your area",
              },
              {
                icon: <FiClock className="text-3xl mb-4 text-amber-400" />,
                title: "Place Order",
                desc: "Select your favorite meals in just a few taps",
              },
              {
                icon: <FiTruck className="text-3xl mb-4 text-amber-400" />,
                title: "Fast Delivery",
                desc: "Get food delivered in under 30 minutes",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Commitment Section (Replaces Popular Categories) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-amber-400">
            Our Commitment
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiShield className="text-3xl mb-4 text-amber-400" />,
                title: "Food Safety",
                desc: "All restaurants meet our strict hygiene standards",
              },
              {
                icon: <FiPocket className="text-3xl mb-4 text-amber-400" />,
                title: "No Hidden Fees",
                desc: "What you see is what you pay",
              },
              {
                icon: <FiHeart className="text-3xl mb-4 text-amber-400" />,
                title: "Customer First",
                desc: "24/7 support for any delivery issues",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-lg hover:shadow-xl transition hover:-translate-y-1"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-amber-400">
            Why Choose Cravex
          </h2>
          <div className="grid md:grid-cols-3 gap-6 bg-gray-800 p-8 rounded-lg">
            <div className="text-center">
              <p className="text-5xl font-bold text-amber-400 mb-2">10,000+</p>
              <p className="text-gray-300">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-amber-400 mb-2">500+</p>
              <p className="text-gray-300">Partner Restaurants</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-amber-400 mb-2">98%</p>
              <p className="text-gray-300">On-Time Delivery</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
