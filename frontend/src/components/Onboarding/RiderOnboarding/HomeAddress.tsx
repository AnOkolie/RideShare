import { TextInput, Text, Stack } from "@mantine/core";
import type { HomeAddressProps } from "~/types/Onboarding/Rider";
import classes from "../Onboarding.module.css";
import { PlaceAutocompleteInput } from "~/components/Address/PlaceAutoComplete";
import { useEffect, useState } from "react";
import type { PlaceSelection } from "~/types/address/address";
export const HomeAddress = ({ form, updateAddress }: HomeAddressProps) => {
  const [place, setPlace] = useState<PlaceSelection>();
  useEffect(() => {
    if (!place) return;
    updateAddress("address", place.address);
    updateAddress("latitude", place.latitude);
    updateAddress("longitude", place.longitude);
    updateAddress("placeId", place.placeId);
  }, [[place]]);
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>
        This is private and is used to make future pickup requests faster.
      </Text>
      <PlaceAutocompleteInput
        placeholderKey="home"
        onPlaceSelected={setPlace}
      />
      <TextInput
        label="Home Address"
        placeholder="Start typing your street address"
        size="md"
        radius="md"
        value={form.home.address}
        onChange={(e) => updateAddress("address", e.target.value)}
      />
    </Stack>
  );
};
