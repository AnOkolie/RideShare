import { PlaceAutocompleteInput } from "../Address/PlaceAutoComplete";
import { Stack, Button } from "@mantine/core";
import type { PlaceSelection } from "~/types/address/address";
import { APIProvider } from "@vis.gl/react-google-maps";

type props = {
  setPickup: (place: PlaceSelection) => void;
  setDestination: (place: PlaceSelection) => void;
};
export const AddressField = ({ setPickup, setDestination }: props) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  return (
    <>
      <APIProvider apiKey={API_KEY} libraries={["places"]}>
        <Stack p={"md"}>
          <PlaceAutocompleteInput
            placeholderKey={"pickup"}
            onPlaceSelected={setPickup}
          />
          <PlaceAutocompleteInput
            placeholderKey={"destination"}
            onPlaceSelected={setDestination}
          />
          <Button type="submit">Search for rides</Button>
        </Stack>

        {/* <Map
        defaultZoom={3}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      /> */}
      </APIProvider>
    </>
  );
};
