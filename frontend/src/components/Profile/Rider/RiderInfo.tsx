import { Stack, TextInput, Title } from "@mantine/core";
import type { riderStructure } from "~/types/riderProfile";
import { riderStore } from "~/zustand/riderStore";
type props = {
  handleFieldChange: (
    key: keyof riderStructure["riderInfo"],
    value: string,
  ) => void;
};
export const RiderInfo = ({ handleFieldChange }: props) => {
  const homeAddress = riderStore((s) => s.rider?.homeAddress);
  return (
    <Stack>
      <Title>Rider Information</Title>
      <TextInput
        defaultValue={homeAddress}
        label="Home Address"
        onChange={(e) => handleFieldChange("homeAddress", e.target.value)}
      />
    </Stack>
  );
};
