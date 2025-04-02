import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast"; // Import toast

const MenuCard = ({
  restaurantId,
  menuId,
  name,
  price,
  image,
  description,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const data = {
    foodId: menuId,
    restaurantId: restaurantId,
    quantity: 1,
  };

  const AddToCart = async () => {
    try {
      setLoading(true); // Show loading indicator
      const response = await axiosInstance.post("/cart/item", data);
      if (response.data) {
        // Handle success
        toast.success("Item added to cart!"); // Success toast
        console.log("Item added to cart:", response.data);
      }
    } catch (error) {
      setError("Failed to add item to cart.");
      toast.error("Failed to add item to cart."); // Error toast
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex gap-4 p-4 h-full">
        {/* Food Image - Fixed Size */}
        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-100">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Food Details - Flex Column */}
        <div className="flex flex-col flex-grow min-h-[96px]">
          {/* Top Row - Name and Price */}
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <span className="text-lg font-bold text-amber-600 whitespace-nowrap">
              ₹{price.toFixed(2)}
            </span>
          </div>

          {/* Middle - Description with fixed height */}
          <div className="my-2 h-[40px] overflow-hidden">
            <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
          </div>

          {/* Bottom - Button always aligned to bottom */}
          <div className="mt-auto">
            <button
              onClick={AddToCart}
              className="w-full flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <FiPlus className="text-base" />
                  Add to order
                </>
              )}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
            {/* Error message */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
