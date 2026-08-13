import { Loader } from "@mantine/core";
import { useAuth } from "~/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
export const ProtectRoute = () => {
  const { loading, isAuthenticated, checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      {loading && <Loader />}
      {isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  );
};
