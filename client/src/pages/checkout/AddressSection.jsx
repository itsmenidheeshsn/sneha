import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddressSection = ({
  savedAddresses,
  selectedAddressId,
  setSelectedAddressId,
  setAddress,
  address,
  onSaveAddress, // New prop for saving address
}) => {
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const userAddress = savedAddresses?.address;

  useEffect(() => {
    console.log("Saved Address Data:", savedAddresses);
    // Auto-select the saved address if it exists
    if (userAddress?._id) {
      setAddress(userAddress);
      setSelectedAddressId(userAddress._id);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [savedAddresses, userAddress, setAddress, setSelectedAddressId]);

  const handleSelectAddress = () => {
    if (userAddress && userAddress._id) {
      setAddress(userAddress);
      setSelectedAddressId(userAddress._id);
      setIsEditing(false);
      toast.success("Saved address selected!", {
        style: {
          border: "1px solid #f59e0b",
          padding: "16px",
          color: "#000",
          background: "#fffbeb",
        },
        iconTheme: {
          primary: "#f59e0b",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  const handleSaveAddress = () => {
    if (validateInputs()) {
      onSaveAddress(address);
      setIsEditing(false);
      toast.success("Address saved successfully!", {
        style: {
          border: "1px solid #10B981",
          padding: "16px",
          color: "#000",
          background: "#ECFDF5",
        },
        iconTheme: {
          primary: "#10B981",
          secondary: "#ECFDF5",
        },
      });
    }
  };

  const validateInputs = () => {
    let tempErrors = {};
    let isValid = true;

    if (!address.name?.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!address.houseName?.trim()) {
      tempErrors.houseName = "House name is required";
      isValid = false;
    }

    if (!address.streetName?.trim()) {
      tempErrors.streetName = "Street name is required";
      isValid = false;
    }

    if (!address.city?.trim()) {
      tempErrors.city = "City is required";
      isValid = false;
    }

    if (!address.state?.trim()) {
      tempErrors.state = "State is required";
      isValid = false;
    }

    // Enhanced pincode validation
    if (!address.pincode) {
      tempErrors.pincode = "Pincode is required";
      isValid = false;
    } else if (!/^\d{6}$/.test(address.pincode)) {
      tempErrors.pincode = "Pincode must be exactly 6 digits";
      isValid = false;
    } else if (address.pincode.startsWith("0")) {
      tempErrors.pincode = "Pincode cannot start with 0";
      isValid = false;
    }

    // Enhanced phone number validation
    if (!address.phone) {
      tempErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(address.phone)) {
      tempErrors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    } else if (!/^[6-9]/.test(address.phone)) {
      tempErrors.phone = "Phone number must start with 6, 7, 8, or 9";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (key, value) => {
    // For pincode and phone, only allow numbers
    if (key === "pincode" || key === "phone") {
      // Remove all non-digit characters
      const numericValue = value.replace(/\D/g, "");

      // Apply max length restrictions
      if (key === "pincode" && numericValue.length > 6) return;
      if (key === "phone" && numericValue.length > 10) return;

      setAddress({ ...address, [key]: numericValue });
    } else {
      setAddress({ ...address, [key]: value });
    }

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 text-white rounded-lg shadow-md border border-gray-700">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-xl font-semibold mb-4 text-amber-300">
        Shipping Address
      </h2>

      {/* Saved Address Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-amber-300">Saved Address:</h3>
          {userAddress && !isEditing && (
            <button
              onClick={handleEditAddress}
              className="text-amber-300 hover:text-amber-200 text-sm font-medium"
            >
              Edit Address
            </button>
          )}
        </div>

        {userAddress && !isEditing ? (
          <button
            type="button"
            onClick={handleSelectAddress}
            className={`block w-full p-4 border rounded transition-all ${
              selectedAddressId === userAddress._id
                ? "bg-gray-700 border-amber-300 shadow-inner"
                : "border-gray-600 hover:bg-gray-700 hover:border-amber-300"
            }`}
          >
            <p className="font-medium text-white">{userAddress.name}</p>
            <p className="text-gray-300">
              {userAddress.houseName}, {userAddress.streetName},{" "}
              {userAddress.landmark}
            </p>
            <p className="text-gray-300">
              {userAddress.city}, {userAddress.state} - {userAddress.pincode}
            </p>
            <p className="text-amber-300">📞 {userAddress.phone}</p>
          </button>
        ) : (
          <>
            {!userAddress && (
              <p className="text-gray-400 italic mb-4">
                No saved address found.
              </p>
            )}

            {/* Address Input Fields */}
            <div className="mt-4 p-4 border rounded bg-gray-700 border-gray-600 shadow-sm">
              <h3 className="font-semibold mb-3 text-amber-300">
                Shipping Details:
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Full Name*", key: "name", type: "text" },
                  { name: "House Name*", key: "houseName", type: "text" },
                  { name: "Street Name*", key: "streetName", type: "text" },
                  { name: "Landmark", key: "landmark", type: "text" },
                  { name: "City*", key: "city", type: "text" },
                  { name: "State*", key: "state", type: "text" },
                  {
                    name: "Pincode*",
                    key: "pincode",
                    type: "text",
                    maxLength: 6,
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  },
                  {
                    name: "Phone Number*",
                    key: "phone",
                    type: "text",
                    maxLength: 10,
                    pattern: "[0-9]*",
                    inputMode: "tel",
                  },
                ].map(({ name, key, type, maxLength, pattern, inputMode }) => (
                  <div key={key}>
                    <input
                      type={type || "text"}
                      placeholder={name}
                      value={address[key] || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className={`w-full p-2 border rounded focus:ring-2 focus:ring-amber-300 focus:border-amber-300 bg-gray-800 text-white ${
                        errors[key] ? "border-red-500" : "border-gray-600"
                      }`}
                      maxLength={maxLength}
                      pattern={pattern}
                      inputMode={inputMode}
                    />
                    {errors[key] && (
                      <p className="text-red-400 text-sm mt-1">{errors[key]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Save Address Button */}
              <button
                onClick={handleSaveAddress}
                className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Save Address
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddressSection;
