import { useEffect } from "react";
import { useUserStore } from "~/zustand/userStore";
export const useLocationHook = () => {
  const accessToken = useUserStore((s) => s.token);
  useEffect(() => {
    let lastSentAt = 0;

    const watchId = navigator.geolocation.watchPosition(
      async ({ coords }) => {
        const now = Date.now();

        // MVP: at most one backend update every 5 seconds.
        if (now - lastSentAt < 5_000) {
          return;
        }

        lastSentAt = now;

        await fetch("http://localhost:8080/api/drivers/me/location", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracyMeters: coords.accuracy,
            heading: coords.heading,
          }),
        });
      },
      (error) => console.error("Unable to get driver location", error),
      {
        enableHighAccuracy: true,
        maximumAge: 5_000,
        timeout: 10_000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [accessToken]);
};
