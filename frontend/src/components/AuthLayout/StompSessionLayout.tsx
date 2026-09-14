import { Outlet } from "react-router-dom";
import { StompSessionProvider } from "react-stomp-hooks";
import { useUserStore } from "~/zustand/userStore";

export const StompSessionLayout = () => {
  const token = useUserStore((state) => state.token);
  return (
    <StompSessionProvider
      url={import.meta.env.VITE_STOMP_URL}
      enabled={Boolean(token)}
      connectHeaders={{ Authorization: `Bearer ${token}` }}
      onConnect={() => console.log("Connected to STOMP")}
      onDisconnect={() => console.log("Disconnected from STOMP")}
      onStompError={(frame) => {
        console.error("Broker error:", frame.headers.message);
        console.error("Additional details:", frame.body);
      }}
      onWebSocketError={(event) => console.error("WebSocket error:", event)}
    >
      <Outlet />
    </StompSessionProvider>
  );
};
