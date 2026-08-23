import { useEffect } from "react";
import { calculateDistance } from "~/api/trips";
import { riderStore } from "~/zustand/riderStore";
import { useUserStore } from "~/zustand/userStore";
export const useCalculateRiderDistance = () => {
  const accessToken = useUserStore((s) => s.token);
  const homeAddress = riderStore((s) => s.rider?.homeAddress);
  useEffect(() => {
    let lastSentAt = 0;

    const watchId = navigator.geolocation.watchPosition(
      async ({ coords }) => {
        const now = Date.now();

        // MVP: at most one backend update every 5 seconds.
        if (now - lastSentAt < 5_000) {
          return;
        }
        if (!homeAddress) return;
        lastSentAt = now;
        const payload = {
          origin: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          destination: {
            address: homeAddress,
          },
        };

        const respo = await calculateDistance(payload);
        console.log("backend ", respo);
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
