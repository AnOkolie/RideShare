import { useEffect, useState } from "react";
import { calculateDistance } from "~/api/trips";
import { getHoursMinutesSeconds } from "~/utils/measuringUnits";
import { riderStore } from "~/zustand/riderStore";

export const useCalculateRiderDistance = () => {
  const homeLatitude = riderStore((s) => s.rider?.homeLatitude);
  const homeLongitude = riderStore((s) => s.rider?.homeLongitude);

  const [duration, setDuration] = useState("0");
  const [geoCords, setGeoCords] = useState<GeolocationCoordinates | null>(null);

  const formatDuration = (duration: number) => {
    return getHoursMinutesSeconds(duration);
  };

  useEffect(() => {
    // Use == null so latitude/longitude 0 are still valid values.
    if (homeLatitude == null || homeLongitude == null) {
      return;
    }

    let lastSentAt = 0;
    let isMounted = true;

    const watchId = navigator.geolocation.watchPosition(
      async ({ coords }) => {
        if (!isMounted) return;

        // Update the local map marker whenever GPS provides a position.
        setGeoCords(coords);

        const now = Date.now();

        // Only call the paid routing API every five seconds.
        if (now - lastSentAt < 5_000) {
          return;
        }

        lastSentAt = now;

        try {
          const response = await calculateDistance({
            origin: {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
            destination: {
              latitude: homeLatitude,
              longitude: homeLongitude,
            },
          });

          const route = response.data?.routes?.[0];

          if (!route || !isMounted) return;

          // Google Routes duration arrives as a string such as "742s".
          const seconds = Number.parseFloat(route.duration ?? "0");

          setDuration(formatDuration(seconds));
        } catch (error) {
          console.error("Unable to calculate route distance", error);
        }
      },
      (error) => console.error("Unable to get rider location", error),
      {
        enableHighAccuracy: true,
        maximumAge: 5_000,
        timeout: 10_000,
      },
    );

    return () => {
      isMounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, [homeLatitude, homeLongitude]);

  return {
    duration,
    geoCords,
  };
};
