import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import ErrorPage from "../pages/ ErrorPage";
import AdminDashboard from "../pages/AdminDashboard";
import LoginPage from "../pages/LoginPage";
import ProtectRoutes from "./ProtectRoutes";
const Route = createBrowserRouter([
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        element: <ProtectRoutes />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
]);

export default Route;
