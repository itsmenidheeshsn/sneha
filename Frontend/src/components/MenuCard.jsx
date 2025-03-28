import React from "react";

const MenuCard = ({ name, price, description }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800">{name}</h3>
          <span className="bg-amber-100 text-amber-800 font-medium px-2 py-1 rounded text-sm">
            ${price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default MenuCard;
