import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useUserStore } from "~/zustand/userStore";
import { driverStore } from "~/zustand/driverStore";

export const useLocationHook = () => {
  const driverId = useUserStore((s) => s.user?.id);
  const token = useUserStore((s) => s.token);
  const driverStatus = driverStore((s) => s.status);

  const [coord, setCoord] = useState<GeolocationCoordinates>();
  if (driverStatus !== "ONLINE") return { coord };

  const stompClientRef = useRef<Client | null>(null);

  /*
   * Establish one STOMP connection.
   */
  useEffect(() => {
    if (!driverId || !token) return;

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",

      connectHeaders: {
        // Custom token authentication header
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5_000,

      onConnect: () => {
        console.log("Connected to STOMP");
      },

      onDisconnect: () => {
        console.log("Disconnected from STOMP");
      },

      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);

        console.error("Additional details:", frame.body);
      },

      onWebSocketError: (event) => {
        console.error("WebSocket error:", event);
      },
    });

    stompClientRef.current = client;

    client.activate();

    return () => {
      stompClientRef.current = null;
      void client.deactivate();
    };
  }, [driverId, token]);

  /*
   * Watch GPS and publish location updates.
   */
  useEffect(() => {
    if (!driverId) return;

    let lastSentAt = 0;

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setCoord(coords);

        const now = Date.now();

        // Send at most once every 5 seconds.
        if (now - lastSentAt < 5_000) {
          return;
        }

        const client = stompClientRef.current;

        if (!client?.connected) {
          return;
        }

        lastSentAt = now;
        console.log("publishing coords", coords);
        client.publish({
          destination: `/app/drivers/${driverId}/location`,

          body: JSON.stringify({
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed,
            accuracyMeters: coords.accuracy,
            heading: coords.heading,
            recordedAt: now,
          }),
        });
      },

      (error) => {
        console.error("Unable to get driver location", error);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 5_000,
        timeout: 10_000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [driverId, token]);

  return {
    coord,
  };
};
