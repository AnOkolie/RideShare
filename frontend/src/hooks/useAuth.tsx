import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "~/zustand/userStore";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const token = useUserStore((s) => s.token);
  const navigate = useNavigate();
  const checkAuth = () => {
    setLoading(true);
    setIsAuthenticated(token ? true : false);
    setLoading(false);
  };
  const redirectToAuth = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };
  return { loading, isAuthenticated, checkAuth, redirectToAuth };
};
