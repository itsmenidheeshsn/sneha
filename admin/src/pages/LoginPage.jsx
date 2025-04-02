import { useForm } from "react-hook-form";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/admin/login", data);

      const { role } = response.data.user;

      if (role === "admin") {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        toast.error("You are not authorized to access this page.");
        setTimeout(() => {
          window.location.href =
            "https://food-ordering-website-virid.vercel.app"; // Or any other route, e.g., home or login page
        }, 1000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
