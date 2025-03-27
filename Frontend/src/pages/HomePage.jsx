import React, { useState } from "react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const username = "John"; // Replace with dynamic user data (e.g., from auth)

  // Mock search suggestions (replace with API calls)
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
            Welcome back, <span className="text-amber-400">{username}</span>!
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
            Popular Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Pizza", "Burger", "Pasta"].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{item}</h3>
                  <p className="text-gray-400 mt-2">
                    Delicious {item.toLowerCase()}!
                  </p>
                  <button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
