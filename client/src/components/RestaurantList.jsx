import React from "react";
import useFetch from "../hooks/useFetch";
import RestaurantCard from "./RestaurantCard";

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} {...restaurant} />
        ))
      ) : (
        <p className="text-gray-600">No restaurants available</p>
      )}
    </div>
  );
};
export default RestaurantList;
