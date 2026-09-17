import { useState } from "react";
import { useSubscription } from "react-stomp-hooks";

export const useTripStatusUpdates = (tripId: string, defaultState: string) => {
  const [status, setStatus] = useState(defaultState);
  useSubscription(`/user/queue/trip/${tripId}/status`, (message) => {
    const body = JSON.parse(message.body);
    console.log("message is body: ", body);
    setStatus(body.status);
  });
  return {
    status,
  };
};
