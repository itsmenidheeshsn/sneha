import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import RestaurantList from "../components/RestaurantList";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [profile, isLoading, error] = useFetch("/user/profile");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      // Simulate API suggestions (replace with real data)
      const mockSuggestions = [
        "Pizza",
        "Burger",
        "Pasta",
        "Salad",
        "Sushi",
      ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Welcome <span className="text-amber-400">{profile.user.name}</span>
          </h1>
          <p className="text-gray-300 text-lg">
            What would you like to order today?
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food, drinks..."
              className="w-full py-4 px-6 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-white rounded-full p-2 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <ul>
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(item);
                      setSuggestions([]);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Featured Items (Optional) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-amber-400">
            Restaurants
          </h2>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
