/// <reference types="google.maps" />
import { TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import type { PlaceSelection } from "~/types/address/address";

type props = {
  placeholderKey: "pickup" | "destination";
  onPlaceSelected: (place: PlaceSelection) => void;
};

export const PlaceAutocompleteInput = ({
  placeholderKey,
  onPlaceSelected,
}: props) => {
  const placeholderTextMap = {
    pickup: "Enter your pickup location",
    destination: "Enter your destination",
  };
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options: google.maps.places.AutocompleteOptions = {
      fields: ["geometry", "name", "formatted_address"],
    };

    const instance = new places.Autocomplete(inputRef.current, options);

    setAutocomplete(instance);

    return () => {
      google.maps.event.clearInstanceListeners(instance);
    };
  }, [places]);

  useEffect(() => {
    if (!autocomplete) return;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      console.log("Selected Place Data:", place);

      if (place.geometry?.location) {
        onPlaceSelected({
          name: place.name ?? "",

          address: place.formatted_address ?? "",

          latitude: place.geometry.location.lat(),

          longitude: place.geometry.location.lng(),
        });
      }

      // if (place.geometry?.location) {
      //   const lat = place.geometry.location.lat();
      //   const lng = place.geometry.location.lng();

      //   console.log("Latitude:", lat);
      //   console.log("Longitude:", lng);

      //   alert(
      //     `Selected: ${place.name}\n` +
      //       `Address: ${place.formatted_address}\n` +
      //       `Lat: ${lat}\n` +
      //       `Lng: ${lng}`,
      //   );
      // }
    });

    return () => {
      listener.remove();
    };
  }, [autocomplete]);

  return (
    <TextInput
      ref={inputRef}
      placeholder={placeholderTextMap[placeholderKey]}
    />
  );
};
