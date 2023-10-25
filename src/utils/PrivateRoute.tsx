import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Router } from "../types/enums";

export const PrivateRoutes = () => {
  const { pathname } = useLocation();

  const storedValue = localStorage.getItem("isValidData");

  return storedValue ? (
    <Outlet />
  ) : (
    <Navigate to={Router.SIGNIN} state={{ pathname }} replace />
  );
};
