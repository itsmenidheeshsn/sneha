import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import {
  FiClock,
  FiShoppingBag,
  FiCheckCircle,
  FiAlertCircle,
  FiTruck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const OrderDetails = () => {
  const [data, isLoading, error] = useFetch("/order/get/all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const orders = data?.orders;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        No orders found.
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "processing":
        return <FiShoppingBag className="text-blue-500" />;
      case "completed":
        return <FiCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FiAlertCircle className="text-red-500" />;
      case "shipped":
        return <FiTruck className="text-purple-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleOrderExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // Helper function to format currency with 2 decimal places
  const formatCurrency = (amount) => {
    return parseFloat(amount || 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Order Summary Header (always visible) */}
            <div
              className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleOrderExpand(order._id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order._id.substring(0, 8)}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()} •{" "}
                    {order.restaurant?.name || "Unknown Restaurant"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {expandedOrder === order._id ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Details (visible only when expanded) */}
            {expandedOrder === order._id && (
              <div className="p-4">
                {/* Order Items */}
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-3">Items</h3>
                  <div className="space-y-4">
                    {order.foodDetails.map((item) => (
                      <div key={item.foodId} className="flex items-start gap-4">
                        <img
                          src={item.foodImage}
                          alt={item.foodName}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.foodName}</h4>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="font-medium">
                          ₹{formatCurrency(item.totalItemPrice)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">
                    Order Summary
                  </h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{formatCurrency(order.totalAmount)}</span>
                  </div>
                  {order.coupon && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">
                        Discount ({order.coupon.discountPercentage}% off)
                      </span>
                      <span className="text-green-600">
                        -₹{formatCurrency(order.totalAmount - order.finalPrice)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{formatCurrency(order.finalPrice)}</span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">
                    Delivery Address
                  </h3>
                  <p className="text-gray-800">
                    {order.deliveryAddress?.city || "Unknown City"},{" "}
                    {order.deliveryAddress?.state || "Unknown State"}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
