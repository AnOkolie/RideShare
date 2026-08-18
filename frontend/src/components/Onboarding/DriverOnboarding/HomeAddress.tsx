import { Card, TextInput } from "@mantine/core";
import type { AddressProps } from "~/types/Onboarding/Driver";
export const HomeAddress = ({ form, updateAddress }: AddressProps) => {
  return (
    <>
      <TextInput
        label="Home Address"
        value={form.address.address}
        onChange={(e) => updateAddress("address", e.target.value)}
      />
    </>
  );
};
