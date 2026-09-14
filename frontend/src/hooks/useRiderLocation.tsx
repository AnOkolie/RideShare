import { QueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "react-stomp-hooks";

export const useRiderLocation = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  useSubscription("/user/queue/ride-accepted", (message) => {
    const trip = JSON.parse(message.body);
    console.log("Accepted trip is: ", trip);
    queryClient.setQueryData(["trip", trip.id], trip);
    queryClient.setQueryData(["active-trip"], trip);
    navigate(`/trips/${trip.id}`);
  });
};
