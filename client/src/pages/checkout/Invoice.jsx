import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Invoice() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { state } = useLocation();
  const discount = state?.discount;

  const [order, isLoading, error] = useFetch(`/order/by/${orderId}`);
  const orderData = order?.order;

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        Error loading order data: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-800 text-white border border-gray-700">
      <h1 className="text-3xl font-bold text-center mb-6 text-amber-300">
        Order Invoice
      </h1>

      <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
        <h2 className="text-xl font-semibold mb-3 text-amber-300">
          Invoice Details
        </h2>
        <div className="space-y-2 text-gray-300">
          <p>
            <span className="font-medium">Invoice Number:</span> {orderData._id}
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(orderData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
        <h2 className="text-xl font-semibold mb-3 text-amber-300">
          Customer Details
        </h2>
        <div className="space-y-2 text-gray-300">
          <p>
            <span className="font-medium">Name:</span> {orderData.user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {orderData.user.email}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {`${orderData.deliveryAddress.street}, ${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.state}`}
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
        <h2 className="text-xl font-semibold mb-3 text-amber-300">
          Restaurant Details
        </h2>
        <p className="text-gray-300">
          <span className="font-medium">Name:</span> {orderData.restaurant.name}
        </p>
      </div>

      <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
        <h2 className="text-xl font-semibold mb-3 text-amber-300">
          Order Items
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-600">
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.cartId.items.map((item) => (
                <tr key={item._id} className="border-b border-gray-600">
                  <td className="px-4 py-2 text-gray-300">
                    {item.foodId.name}
                  </td>
                  <td className="px-4 py-2 text-gray-300">{item.quantity}</td>
                  <td className="px-4 py-2 text-gray-300">
                    ₹{(item.totalItemPrice / item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    ₹{item.totalItemPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-right mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
        {discount && (
          <div className="flex gap-2 justify-end text-green-400 mb-2">
            <p>Coupon Discount:</p>
            <p>- ₹{discount}</p>
          </div>
        )}
        <h2 className="text-xl font-semibold text-amber-300">
          Total: ₹{orderData.finalPrice.toFixed(2)}
        </h2>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Continue Ordering
        </button>
      </div>
    </div>
  );
}

export default Invoice;
