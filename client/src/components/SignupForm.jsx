import { useState } from "react";
import React from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "seller", // Set seller as default role
    isRestaurant: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.isRestaurant && !formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.isRestaurant) {
      alert("You must check the restaurant checkbox to sign up");
      return;
    }

    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 1500);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Signup Successful!
        </h2>
        <p className="text-gray-600">
          Thank you for registering as a restaurant.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Restaurant Signup
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="isRestaurant"
                name="isRestaurant"
                type="checkbox"
                checked={formData.isRestaurant}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="isRestaurant"
                className="font-medium text-gray-700"
              >
                I am registering as a restaurant
              </label>
              <p className="text-gray-500">
                Check this box to enable restaurant registration
              </p>
            </div>
          </div>

          {formData.isRestaurant && (
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Restaurant Role
              </label>
              <div className="mt-1">
                <input type="hidden" name="role" value="seller" />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.role ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  disabled // Disabled since we only want seller role
                >
                  <option value="seller">Seller</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !formData.isRestaurant}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                formData.isRestaurant
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  : "bg-gray-400 cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSubmitting ? "opacity-70" : ""
              }`}
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
