import React, { useEffect } from "react";
import { FiShoppingCart, FiPlus } from "react-icons/fi";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartData, isLoading, error, fetchCart] = useFetch("/cart/all");

  // Ensure cart data is available
  const cart = cartData?.data || { items: [], totalPrice: 0, finalPrice: 0 };
  const isEmptyCart = cart.items.length === 0 && !isLoading && !error;

  const removeItemFromCart = async (itemId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${itemId}`);
      await fetchCart(); // Fetch updated cart data
      console.log(cart);
      setTimeout(() => {
        if (cart.items.length === 1) {
          // If only one item was in cart before removal
          navigate("/home"); // Redirect user when cart becomes empty
        }
      }, 100);

      toast.success("Item removed from cart");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (foodId, action) => {
    try {
      await axiosInstance.put("/cart/update", { foodId, action });
      await fetchCart(); // Fetch updated cart after changing quantity
      toast.success("Cart updated");
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const handleCheckout = () => {
    if (isEmptyCart) {
      toast.error("Your cart is empty");
      return;
    }

    if (cart._id) {
      navigate("/checkout", { state: { cart, cartId: cart._id } }); // ✅ Pass entire cart
    } else {
      toast.error("Unable to proceed to checkout");
      console.error("Cart ID not found");
    }
  };

  // Navigate to /cart when the cart is empty
  useEffect(() => {
    if (isEmptyCart) {
      navigate("/cart");
    }
  }, [isEmptyCart, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  if (error && error.response?.status !== 404) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 max-w-md text-center">
          <div className="text-red-500 font-medium mb-2">
            Unable to load cart
          </div>
          <p className="text-gray-600 text-sm mb-4">
            {error.message || "There was a problem loading your cart items"}
          </p>
          <button
            onClick={fetchCart}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isEmptyCart) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <div className="bg-amber-50 p-6 rounded-full mb-4">
          <FiShoppingCart className="text-4xl text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 max-w-md mb-6">
          Looks like you haven't added any delicious items yet. Let's fix that!
        </p>
        <Link
          to="/menu"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <FiPlus className="text-lg" />
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <p className="text-gray-500">
          {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 p-4 bg-white rounded-xl shadow-xs border border-gray-100"
          >
            <img
              src={item.foodImage}
              alt={item.foodName}
              className="w-20 h-20 rounded-lg object-cover border border-gray-100"
            />

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-900">{item.foodName}</h3>
                <p className="font-semibold">₹{item.totalItemPrice}</p>
              </div>

              <p className="text-sm text-gray-500 mb-3">
                ₹{item.totalItemPrice / item.quantity} per item
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.foodId, "decrement")}
                    disabled={item.quantity <= 1}
                    className={`px-3 py-1 ${
                      item.quantity <= 1
                        ? "text-gray-300"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <HiOutlineMinusSm />
                  </button>
                  <span className="px-3 py-1 text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.foodId, "increment")}
                    className="px-3 py-1 text-gray-700 hover:bg-gray-50"
                  >
                    <HiOutlinePlusSm />
                  </button>
                </div>

                <button
                  onClick={() => removeItemFromCart(item.foodId)}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isEmptyCart && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs sticky bottom-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Subtotal</p>
              <p className="text-xl font-bold text-gray-900">
                ₹{cart.totalPrice}
              </p>
              {cart.discount > 0 && (
                <p className="text-sm text-green-600">
                  You saved ₹{cart.discount}
                </p>
              )}
            </div>
            <button
              onClick={handleCheckout}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
