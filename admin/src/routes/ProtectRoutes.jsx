import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoutes = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isUserAuth) {
    navigate("/admin/login");
  }
  return isUserAuth && <Outlet />;
};

export default ProtectRoutes;
