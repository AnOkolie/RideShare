import { useSubscription } from "react-stomp-hooks";

export const useRiderLocation = () => {
  useSubscription("/user/queue/ride-accepted", (message) => {
    const trip = JSON.parse(message.body);
    console.log("trip: ", trip);
  });
};
