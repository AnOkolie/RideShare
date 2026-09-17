import { type IMessage } from "react-stomp-hooks";
import { useUserStore } from "~/zustand/userStore";
import { useState } from "react";
import type { tripOffer } from "~/types/trips";
import { useStompSubscribe } from "./useStompSubscribe";

export const useStompHook = () => {
  const role = useUserStore((s) => s.role);
  const [offer, setOffer] = useState<tripOffer>();
  const subscribeToRideOffers = () => {
    const handleMessage = (message: IMessage) => {
      const trip = JSON.parse(message.body);
      const newTrip = {
        tripId: trip.tripId,
        pickupAddress: trip.pickupAddress,
        destinationAddress: trip.destinationAddress,
        estimatedDistanceMeters: trip.estimatedDistanceMeters,
        estimatedFareCents: trip.estimatedFareCents,
        estimatedDurationSeconds: trip.estimatedDurationSeconds,
      };
      console.log(newTrip);
      setOffer(newTrip);
    };
    const destination = role === "driver" ? "/user/queue/ride-offers" : "";
    useStompSubscribe(destination, handleMessage);
  };
  return {
    subscribeToRideOffers,
    offer,
  };
};
