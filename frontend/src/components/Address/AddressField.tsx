import { PlaceAutocompleteInput } from "../Address/PlaceAutoComplete";
import { Box, Stack, Button } from "@mantine/core";
import type { PlaceSelection } from "~/types/address/address";
import { APIProvider } from "@vis.gl/react-google-maps";

type props = {
  setPickup: (place: PlaceSelection) => void;
  setDestination: (place: PlaceSelection) => void;
};
export const AddressField = ({ setPickup, setDestination }: props) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  return (
    <Box p="md" style={{ height: "100vh", width: "100%" }}>
      <Stack p={"md"}>
        <PlaceAutocompleteInput
          placeholderKey={"pickup"}
          onPlaceSelected={setPickup}
        />
        <PlaceAutocompleteInput
          placeholderKey={"destination"}
          onPlaceSelected={setDestination}
        />
        <Button>Search for rides</Button>
      </Stack>
      <APIProvider apiKey={API_KEY} libraries={["places"]}>
        {/* <Map
        defaultZoom={3}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      /> */}
      </APIProvider>
    </Box>
  );
};
