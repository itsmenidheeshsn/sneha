import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressSection = ({
  savedAddresses,
  selectedAddressId,
  setSelectedAddressId,
  setAddress,
  address,
}) => {
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [creatingNewAddress, setCreatingNewAddress] = useState(false);

  useEffect(() => {
    console.log("Saved Address Data:", savedAddresses);
  }, [savedAddresses]);

  const userAddress = savedAddresses?.address;

  const handleSelectAddress = () => {
    if (userAddress && userAddress._id) {
      console.log("Selected Address ID:", userAddress._id);
      setAddress(userAddress);
      setSelectedAddressId(userAddress._id);
      setUseSavedAddress(true);
    }
  };

  const handleCreateAddress = async () => {
    try {
      const response = await axios.post("/address/create", address);
      console.log("Address Created:", response.data);
      setAddress(response.data.address);
      setSelectedAddressId(response.data.address._id);
      setCreatingNewAddress(false);
    } catch (error) {
      console.error(
        "Error creating address:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Saved Address:</h3>
        {userAddress ? (
          <button
            type="button"
            onClick={handleSelectAddress}
            className={`block w-full p-4 border rounded ${
              selectedAddressId === userAddress._id ? "bg-amber-100" : ""
            }`}
          >
            <p>{userAddress.name || "Name not found"}</p>
            <p>
              {userAddress.houseName || "N/A"},{" "}
              {userAddress.streetName || "N/A"}, {userAddress.landmark || "N/A"}
            </p>
            <p>
              {userAddress.city || "N/A"}, {userAddress.state || "N/A"} -{" "}
              {userAddress.pincode || "N/A"}
            </p>
            <p className="text-gray-600">📞 {userAddress.phone || "N/A"}</p>
          </button>
        ) : (
          <p>No saved address found.</p>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => setCreatingNewAddress(!creatingNewAddress)}
          className="text-amber-600 underline"
        >
          {creatingNewAddress ? "Use Saved Address" : "Create New Address"}
        </button>
      </div>

      {creatingNewAddress && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold mb-2">Enter New Address:</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="House Name"
            value={address.houseName}
            onChange={(e) =>
              setAddress({ ...address, houseName: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Street Name"
            value={address.streetName}
            onChange={(e) =>
              setAddress({ ...address, streetName: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Landmark"
            value={address.landmark}
            onChange={(e) =>
              setAddress({ ...address, landmark: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="button"
            onClick={handleCreateAddress}
            className="w-full p-2 bg-amber-500 text-white rounded mt-2"
          >
            Save Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
