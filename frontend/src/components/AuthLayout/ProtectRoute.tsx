import { Loader } from "@mantine/core";
import { useAuth } from "~/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserActivity } from "~/hooks/useUserActivity";
export const ProtectRoute = () => {
  const { loading, isAuthenticated, checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);
  useUserActivity();
  return (
    <>
      {loading && <Loader />}
      {isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  );
};
