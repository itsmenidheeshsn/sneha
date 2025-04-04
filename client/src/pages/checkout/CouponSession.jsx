import React, { useState } from "react";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../config/axiosInstance";

function CouponSection({
  cartId,
  onDiscountApplied,
  selectedCoupon,
  setSelectedCoupon,
}) {
  const [loading, setLoading] = useState(false);
  const [viewCoupons, setViewCoupons] = useState(false);
  const [coupons, isLoading, error] = useFetch("/coupon/get");
  const couponData = coupons?.coupon || [];

  const handleViewCoupons = () => setViewCoupons(!viewCoupons);

  const applyCoupon = async (code) => {
    if (!cartId) {
      toast.error("Cart ID is missing!");
      return;
    }
    if (!code.trim()) {
      toast.error("Please enter a valid coupon code.");
      return;
    }

    setLoading(true);
    setSelectedCoupon(code);

    try {
      const response = await axiosInstance.post("/coupon/apply-coupon", {
        code,
        cartId,
      });

      if (response?.data?.discount) {
        const { discount, finalPrice, orderValue } = response.data;
        toast.success(
          `Coupon applied! Discount: ₹${discount}, Final Price: ₹${finalPrice}`
        );
        onDiscountApplied(discount, finalPrice, orderValue);
      } else {
        toast.error(response?.data?.message || "Invalid coupon code.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="text-white">
      {/* Coupon Input */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={selectedCoupon || ""}
          onChange={(e) => setSelectedCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-grow px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
        />
        <button
          type="button"
          onClick={() => applyCoupon(selectedCoupon)}
          disabled={loading}
          className={`hidden lg:block px-4 py-2 ${
            loading ? "bg-amber-400" : "bg-amber-500 hover:bg-amber-600"
          } text-white rounded transition-colors`}
        >
          {loading ? "Validating..." : "Apply"}
        </button>
      </div>

      <p
        className="text-sm text-amber-300 cursor-pointer hover:text-amber-400 transition-colors"
        onClick={handleViewCoupons}
      >
        {viewCoupons ? "Hide Coupons" : "View Available Coupons"}
      </p>

      {/* Available Coupons */}
      {couponData.length > 0 ? (
        <div className="mt-4">
          {viewCoupons && (
            <>
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                Available Coupons:
              </h3>
              <ul className="space-y-3">
                {couponData.map((coupon) => (
                  <li
                    key={coupon._id}
                    className={`border p-4 rounded cursor-pointer transition-colors ${
                      coupon.isAvailable
                        ? "border-amber-400 hover:bg-gray-700"
                        : "border-gray-600 bg-gray-700 opacity-70"
                    }`}
                    onClick={() =>
                      coupon.isAvailable && applyCoupon(coupon.code)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">
                        {coupon.code}
                      </span>
                      <span className="text-amber-300">
                        {coupon.discountPercentage}% off
                      </span>
                    </div>
                    <div className="text-sm text-gray-300 mt-1">
                      Min Order: ₹{coupon.minOrderVal} | Max Discount: ₹
                      {coupon.MaxDiscValue}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Expires on:{" "}
                      {new Date(coupon.expiryDate).toLocaleDateString()}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        coupon.isAvailable ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {coupon.isAvailable ? "Active" : "Expired"}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        <div className="mt-4 text-gray-400">No available coupons.</div>
      )}

      {/* Small screen apply button */}
      <div className="sm:hidden mt-4">
        <button
          type="button"
          onClick={() => applyCoupon(selectedCoupon)}
          disabled={loading}
          className={`w-full px-4 py-2 ${
            loading ? "bg-amber-400" : "bg-amber-500 hover:bg-amber-600"
          } text-white rounded transition-colors`}
        >
          {loading ? "Validating..." : "Apply Coupon"}
        </button>
      </div>
    </div>
  );
}

export default CouponSection;
