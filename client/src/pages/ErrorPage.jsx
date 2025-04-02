import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-700 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-amber-300 p-4 flex items-center">
          <FaExclamationTriangle className="text-gray-800 text-2xl mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Oops!</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-lg text-gray-300">
            {error.status === 404
              ? "The page you're looking for doesn't exist."
              : "Sorry, an unexpected error has occurred."}
          </p>

          <div className="bg-gray-600 p-3 rounded-md">
            <p className="text-amber-300 font-mono text-sm">
              {error.statusText || error.message}
            </p>
            {error.status && (
              <p className="text-gray-400 text-sm mt-1">
                Error code: {error.status}
              </p>
            )}
          </div>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-amber-300 text-gray-800 font-medium rounded-md hover:bg-amber-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
