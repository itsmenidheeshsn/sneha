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
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";

import OrderDetails from "../pages/OrderDetails";
import PaymentPage from "../pages/PaymentPage";
import Invoice from "../pages/checkout/Invoice";

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
          { path: "restaurant/:id", element: <RestaurantPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "orders", element: <OrderDetails /> },
          { path: "payment", element: <PaymentPage /> },
          {
            path: "invoice/:orderId",
            element: <Invoice />,
          },
        ],
      },
    ],
  },
]);

export default Router;
