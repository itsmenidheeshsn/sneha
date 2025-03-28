import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import LandPage from "../pages/LandPage";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUpPage";
import AboutPage from "../pages/AboutPage";
import ProtectRoutes from "./ProtectRoutes";
import ProfilePage from "../pages/ProfilePage";
import ContactPage from "../pages/ContactPage";
import RestaurantPage from "../pages/RestaurantPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "", element: <LandPage /> },
      {
        element: <ProtectRoutes />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "about", element: <AboutPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "contact", element: <ContactPage /> },
          { path: "restaurant", element: <RestaurantPage /> },
        ],
      },
    ],
  },
]);

export default Router;
