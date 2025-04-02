import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MenuCard from "../components/MenuCard";
import { FaStar, FaPhone, FaClock, FaUtensils } from "react-icons/fa";

const RestaurantPage = () => {
  const { id } = useParams();
  const [data, isLoading, error] = useFetch(`/restaurant/id/${id}`);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p className="font-bold">Error</p>
          <p>{error.message}</p>
        </div>
      </div>
    );

  const restaurant = data?.findRestaurant;

  return (
    <div className="min-h-screen bg-gray-50">
      {restaurant ? (
        <div className="container mx-auto px-4 py-8">
          {/* Restaurant Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64 w-full">
              <img
                className="w-full h-full object-cover"
                src={restaurant.image}
                alt={restaurant.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <FaStar className="mr-1" /> {restaurant.rating}
                  </span>
                  <span
                    className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      restaurant.isOpen
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <FaClock className="mr-1" />{" "}
                    {restaurant.isOpen ? "Open Now" : "Closed"}
                  </span>
                  <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <FaPhone className="mr-1" /> {restaurant.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Section */}
            <div className="p-6">
              <div className="flex items-center mb-6">
                <FaUtensils className="text-2xl text-amber-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Our Menu</h2>
              </div>

              {restaurant.menu && restaurant.menu.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurant.menu.map((item) => (
                    <MenuCard
                      key={item._id}
                      restaurantId={restaurant._id}
                      menuId={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      description={item.description}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">
                    Menu Coming Soon
                  </h3>
                  <p className="text-gray-500 mt-1">
                    We're working on our menu. Please check back later!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mt-4">
              Restaurant Not Found
            </h3>
            <p className="text-gray-500 mt-1">
              We couldn't find the restaurant you're looking for.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
