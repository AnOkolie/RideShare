import { TextInput, Stack, Text } from "@mantine/core";
import type { AddressProps } from "~/types/Onboarding/Driver";
import classes from "../Onboarding.module.css";
export const HomeAddress = ({ form, updateAddress }: AddressProps) => {
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>This information is private and used only for account support and verification.</Text>
      <TextInput
        label="Home Address"
        placeholder="Start typing your street address"
        size="md"
        radius="md"
        value={form.address.address}
        onChange={(e) => updateAddress("address", e.currentTarget.value)}
      />
    </Stack>
  );
};
