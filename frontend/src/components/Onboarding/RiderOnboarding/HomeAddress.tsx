import { Card, TextInput } from "@mantine/core";
import type { HomeAddressProps } from "~/types/Rider";
export const HomeAddress = ({ form, updateAddress }: HomeAddressProps) => {
  return (
    <>
      <Card withBorder radius="lg" p="lg">
        <TextInput
          label="Home Address"
          value={form.home.address}
          onChange={(e) => updateAddress("address", e.target.value)}
        />
      </Card>
    </>
  );
};
