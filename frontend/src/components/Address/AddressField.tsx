/// <reference types="google.maps" />
import { PlaceAutocompleteInput } from "../Address/PlaceAutoComplete";
import { Stack, Button } from "@mantine/core";
import type { PlaceSelection } from "~/types/address/address";

type props = {
  setDestination: (place: PlaceSelection) => void;
};
export const AddressField = ({ setDestination }: props) => {
  return (
    <>
      <Stack p={"md"}>
        <PlaceAutocompleteInput
          placeholderKey={"destination"}
          onPlaceSelected={setDestination}
        />
        <Button type="submit">Search for rides</Button>
      </Stack>
    </>
  );
};
