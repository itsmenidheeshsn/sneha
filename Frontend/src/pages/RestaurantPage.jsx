import React from "react";
import MenuCard from "../components/MenuCard";

const RestaurantPage = () => {
  // Restaurant information
  const restaurantInfo = {
    name: "Bella Cucina",
    tagline: "Authentic Italian Dining Experience",
    description:
      "Family-owned since 1995, serving traditional recipes with modern flair",
    rating: 4.8,
    reviewCount: 427,
    location: "123 Pasta Street, Foodville, FL 12345",
    email: "reservations@bellacucina.com",
    phone: "(555) 123-4567",
    image: "/kfc.jpg", // Replace with your image path
  };

  // Menu data
  const menuItems = [
    // ... your existing menu items array
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gray-800 z-10 opacity-50"></div>
        <img
          src={restaurantInfo.image}
          alt="Restaurant interior"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">
              {restaurantInfo.name}
            </h1>
            <p className="text-xl text-amber-300 mb-4">
              {restaurantInfo.tagline}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                ★ {restaurantInfo.rating} ({restaurantInfo.reviewCount}+
                reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Restaurant Description */}
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {restaurantInfo.description}
            </p>
          </div>

          {/* Contact Box */}
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl md:w-1/3 w-full">
            <h3 className="text-xl font-semibold text-amber-300 mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <span className="text-amber-300 mr-2">📍</span>
                {restaurantInfo.location}
              </p>
              <p className="flex items-start">
                <span className="text-amber-300 mr-2">✉️</span>
                {restaurantInfo.email}
              </p>
              <p className="flex items-start">
                <span className="text-amber-300 mr-2">📞</span>
                {restaurantInfo.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <MenuCard
                key={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                isPopular={item.isPopular}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
