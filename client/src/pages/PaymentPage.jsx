import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { toast } from "react-hot-toast";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (location.state?.orderDetails) {
      setOrder(location.state.orderDetails);
    } else if (location.state?.orderId) {
      axiosInstance
        .get(`/order/get/${location.state.orderId}`)
        .then((res) => {
          const orderData = res.data.order;
          setOrder({
            _id: orderData._id,
            restaurant: {
              name: orderData.restaurantName,
              _id: orderData.restaurant,
            },
            totalAmount: orderData.totalAmount,
            finalPrice: orderData.finalPrice,
            cartId: {
              items: orderData.foodDetails.map((item) => ({
                foodName: item.name,
                foodImage: item.image,
                quantity: item.quantity,
                totalItemPrice: item.price * item.quantity,
              })),
            },
          });
        })
        .catch((err) => {
          console.error("Order fetch error:", err);
          toast.error("Failed to load order details");
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handlePayment = async () => {
    if (!order) return;

    try {
      setShowLoader(true);
      const { data } = await axiosInstance.post(`/payment/create/${order._id}`);

      if (!data?.razorpayOrder) {
        toast.error("Payment initialization failed");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: order.restaurant.name,
        description: `Order #${order._id}`,
        image:
          "https://res.cloudinary.com/dzmymp0yf/image/upload/v1740756873/Food%20Order%20Website/Byteeats%20Profile%20Logo.png",
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axiosInstance.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success(verifyResponse.data.message);
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          } catch (err) {
            console.error("Payment verification failed:", err);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "Customer Name", // Replace with actual user data
          email: "customer@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#F59E0B",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setShowLoader(false);
    }
  };

  if (showLoader) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col justify-center items-center gap-3">
          <p className="text-2xl font-bold text-green-600">
            Processing your payment...
          </p>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {order ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-amber-500 p-6 text-white">
              <h1 className="text-2xl font-bold">Complete Payment</h1>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <p>
                    <span className="font-medium">Order ID:</span> {order._id}
                  </p>
                  <p>
                    <span className="font-medium">Restaurant:</span>{" "}
                    {order.restaurant.name}
                  </p>
                </div>

                <div className="border-t border-b border-amber-100 py-4 my-4">
                  {order.cartId.items.map((item) => (
                    <div key={item._id} className="flex justify-between py-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.foodImage}
                          alt={item.foodName}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.foodName}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">₹{item.totalItemPrice}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                  {order.totalAmount - order.finalPrice > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{order.totalAmount - order.finalPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t border-amber-100 pt-3 mt-2">
                    <span>Total to Pay</span>
                    <span className="text-amber-600">₹{order.finalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>Loading order details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
