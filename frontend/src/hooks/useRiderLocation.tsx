import { Client } from "@stomp/stompjs";
import { useEffect } from "react";

export const useRiderLocation = (tripId: string) => {
  //   useEffect(() => {
  //     const client = new Client({
  //       brokerURL: "ws://localhost:8080/ws",
  //       reconnectDelay: 5_000,
  //     });
  //     client.onConnect = () => {
  //       client.subscribe(`/topic/trips/${tripId}/driver-location`, (message) => {
  //         const location = JSON.parse(message.body);
  //         setDriverPosition({
  //           lat: location.latitude,
  //           lng: location.longitude,
  //         });
  //       });
  //     };
  //     client.activate();
  //     return () => client.deactivate();
  //   }, [tripId]);
};
