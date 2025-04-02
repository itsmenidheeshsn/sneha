import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700 mt-4">Oops! Page not found.</p>
      <Link
        to="/admin/dashboard"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default ErrorPage;
