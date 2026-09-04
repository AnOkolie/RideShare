import { Container, TextInput } from "@mantine/core";
import type { AddressProps } from "~/types/Onboarding/Driver";
export const HomeAddress = ({ form, updateAddress }: AddressProps) => {
  return (
    <Container size={440} pl={"lg"}>
      <TextInput
        label="Home Address"
        value={form.address.address}
        onChange={(e) => updateAddress("address", e.currentTarget.value)}
      />
    </Container>
  );
};
