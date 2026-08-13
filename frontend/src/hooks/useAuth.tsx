import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // const token = useUserStore((s) => s.token);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const checkAuth = () => {
    setLoading(true);
    try {
      setIsAuthenticated(token ? true : false);
    } finally {
      setLoading(false);
    }
  };
  const redirectToAuth = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };
  return { loading, isAuthenticated, checkAuth, redirectToAuth };
};
