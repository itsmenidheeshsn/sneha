import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserdata, saveUserData } from "../redux/features/userSlice";
const UserLayout = () => {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/check/user",
      });
      dispatch(saveUserData());
    } catch (error) {
      console.error(error);
      dispatch(clearUserdata());
    }
  };
  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <div>
      <header>{isUserAuth ? <UserNavbar /> : <Navbar />}</header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
