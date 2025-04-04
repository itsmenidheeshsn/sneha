import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";

function PriceDetails({
  cart,
  discount,
  finalPrice,
  selectedCoupon,
  setSelectedCoupon,
  selectedAddressId,
  setSelectedAddressId,
  address,
}) {
  const navigate = useNavigate();
  const { error, isLoading, Razorpay } = useRazorpay();

  if (!cart) {
    return (
      <div className="text-center text-gray-400">No cart data available</div>
    );
  }

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      return toast.error("Your cart is empty. Please add items to the cart.");
    }

    try {
      let addressId = selectedAddressId;
      if (!addressId) {
        const response = await axiosInstance.post("/address/create", address);
        addressId = response.data.address._id;
        if (!addressId) {
          throw new Error("Failed to save the address.");
        }
        setSelectedAddressId(addressId);
      }

      const checkoutData = {
        restaurant: cart.restaurantId,
        cartId: cart._id,
        coupon: selectedCoupon || null,
        deliveryAddress: addressId,
      };

      const response = await axiosInstance.post("/order/create", checkoutData);
      const orderId = response?.data?.order?._id;
      setSelectedCoupon(null);

      const payment = await axiosInstance.post(`/payment/create/${orderId}`);
      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_ID_KEY}`,
        amount: payment.data.razorpayOrder.amount,
        currency: "INR",
        name: "CraveX",
        description: "Food Order Payment",
        order_id: payment.data.razorpayOrder.id,
        handler: async (response) => {
          try {
            await axiosInstance.post("/payment/verify", response);
            setSelectedCoupon(null);
            navigate(`/invoice/${orderId}`, { state: { discount } });
            toast.success("Your order is placed successfully");
          } catch (error) {
            console.error("Verification failed:", error);
            toast.error("Payment verification failed.");
          }
        },
        theme: {
          color: "#1E1E1E",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error(
        "Failed to place the order:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Error while placing the order."
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="price-details bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600">
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2 text-amber-300">
          Order Summary
        </h3>

        {/* Item List */}
        <div className="space-y-3 mb-4">
          {cart.items.map((item) => (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex-grow">
                <span className="text-gray-300">{item.foodId.name}</span>
                <span className="text-gray-500 ml-2">(x{item.quantity})</span>
              </div>
              <span className="text-gray-300">₹{item.totalItemPrice}</span>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="border-t border-gray-600 pt-4 space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal:</span>
            <span>₹{cart.totalPrice}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Discount:</span>
              <span>- ₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg mt-2 text-amber-300">
            <span>Total:</span>
            <span>₹{finalPrice}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-amber-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-amber-600 transition-colors"
      >
        Place Order
      </button>
    </div>
  );
}

export default PriceDetails;
