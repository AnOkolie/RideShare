import { useEffect, useState } from "react";
import { useUserStore } from "~/zustand/userStore";
import { driverStore } from "~/zustand/driverStore";
import { useStompClient } from "react-stomp-hooks";

export const useLocationHook = (stompDestination: string) => {
  const driverId = useUserStore((s) => s.user?.id);
  const driverStatus = driverStore((s) => s.status);
  const role = useUserStore((s) => s.role);
  const client = useStompClient();

  const [coord, setCoord] = useState<GeolocationCoordinates>();
  const shouldTrackLocation =
    role === "driver" &&
    driverStatus !== "OFFLINE" &&
    Boolean(driverId) &&
    Boolean(client) &&
    Boolean(stompDestination);
  console.log(`${driverStatus} : ${driverId} : ${client?.connected} : ${role}`);
  useEffect(() => {
    console.log("effect called");
    if (!shouldTrackLocation || !client || !driverId) {
      console.log("if clause triggered");
      return;
    }
    let lastSentAt = 0;

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setCoord(coords);

        const now = Date.now();

        if (now - lastSentAt < 5_000) {
          return;
        }

        if (!client.connected) {
          return;
        }

        lastSentAt = now;
        console.log("publishing stomp: ", coords);
        client.publish({
          destination: stompDestination,

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
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("Location permission denied");
            break;

          case error.POSITION_UNAVAILABLE:
            console.error("Location temporarily unavailable");
            break;

          case error.TIMEOUT:
            console.error("Location request timed out");
            break;

          default:
            console.error("Unknown geolocation error", error);
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15_000,
        maximumAge: 5_000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [driverStatus, driverId, client, shouldTrackLocation, stompDestination]);

  return {
    coord,
  };
};
