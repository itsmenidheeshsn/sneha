import React from "react";
import { Link } from "react-router-dom";
const RestaurantCard = ({ _id, name, image, rating, isOpen }) => {
  return (
    <Link to={`/restaurant/${_id}`}>
      <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
        <img
          className="w-full h-48 object-cover"
          src={image}
          alt={name}
          loading="lazy"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
            {name}
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-800 font-semibold">{rating}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
