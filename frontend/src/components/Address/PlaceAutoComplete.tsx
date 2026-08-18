/// <reference types="google.maps" />

import { Box } from "@mantine/core";
import { useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import type { PlaceSelection } from "~/types/address/address";

type Props = {
  placeholderKey: "pickup" | "destination";
  onPlaceSelected: (place: PlaceSelection) => void;
};

export const PlaceAutocompleteInput = ({
  placeholderKey,
  onPlaceSelected,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const places = useMapsLibrary("places");

  const placeholderTextMap = {
    pickup: "Enter your pickup location",
    destination: "Enter your destination",
  };

  useEffect(() => {
    if (!places || !containerRef.current) return;

    const autocomplete = new google.maps.places.PlaceAutocompleteElement();

    autocomplete.placeholder = placeholderTextMap[placeholderKey];

    autocomplete.addEventListener("gmp-select", async (event) => {
      const { placePrediction } = event as any;

      const place = placePrediction.toPlace();

      await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location"],
      });

      if (!place.location) return;

      onPlaceSelected({
        name: place.displayName ?? "",
        address: place.formattedAddress ?? "",
        latitude: place.location.lat(),
        longitude: place.location.lng(),
      });
    });

    containerRef.current.appendChild(autocomplete);

    return () => {
      autocomplete.remove();
    };
  }, [places, placeholderKey, onPlaceSelected]);

  return <Box ref={containerRef} />;
};
