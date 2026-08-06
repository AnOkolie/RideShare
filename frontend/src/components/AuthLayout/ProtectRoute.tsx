import { Loader, Box } from "@mantine/core";
import { useAuth } from "~/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
export const ProtectRoute = () => {
  const { loading, isAuthenticated } = useAuth();
  return (
    <Box
      style={{
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      {loading && <Loader />}
      {!isAuthenticated && <Navigate to={"/login"} />}
      <Outlet />
    </Box>
  );
};
