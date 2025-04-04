import React, { useState } from "react";
import AddressSection from "./AddressSection";
import PriceDetails from "./PriceDetails";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CouponSection from "./CouponSession";

function CheckoutPage() {
  const location = useLocation();
  const [savedAddresses, isLoading, error] = useFetch("/address/get");
  const [address, setAddress] = useState({
    name: "",
    houseName: "",
    streetName: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { cart, cartId } = location.state || {};

  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(cart ? cart.totalPrice : 0);

  const handleDiscountApplied = (discount, finalPrice) => {
    setDiscount(discount);
    setFinalPrice(finalPrice);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Address Section */}
          <div className="col-span-2 bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-amber-300">
              Shipping Address
            </h2>
            <AddressSection
              address={address}
              setAddress={setAddress}
              savedAddresses={savedAddresses}
              setSelectedAddressId={setSelectedAddressId}
              selectedAddressId={selectedAddressId}
            />
          </div>

          {/* Coupon and Price Section */}
          <div className="space-y-6">
            {/* Coupon Section */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-amber-300">
                Apply Coupon
              </h2>
              <CouponSection
                cartId={cart?._id}
                onDiscountApplied={handleDiscountApplied}
                selectedCoupon={selectedCoupon}
                setSelectedCoupon={setSelectedCoupon}
              />
            </div>

            {/* Price Details */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-amber-300">
                Price Details
              </h2>
              <PriceDetails
                cart={cart}
                discount={discount}
                finalPrice={finalPrice}
                selectedCoupon={selectedCoupon}
                selectedAddressId={selectedAddressId}
                setSelectedCoupon={setSelectedCoupon}
                setSelectedAddressId={setSelectedAddressId}
                address={address}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
