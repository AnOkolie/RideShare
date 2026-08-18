import { TextInput } from "@mantine/core";
import type { HomeAddressProps } from "~/types/Onboarding/Rider";
export const HomeAddress = ({ form, updateAddress }: HomeAddressProps) => {
  return (
    <>
      <TextInput
        label="Home Address"
        value={form.home.address}
        onChange={(e) => updateAddress("address", e.target.value)}
      />
    </>
  );
};
