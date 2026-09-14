import { useAuth } from "~/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserActivity } from "~/hooks/useUserActivity";
import { PageLoading } from "~/components/Feedback/LoadingState";

export const ProtectRoute = () => {
  const { loading, isAuthenticated, checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  useUserActivity();

  if (loading) {
    return <PageLoading label="Checking your account" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
