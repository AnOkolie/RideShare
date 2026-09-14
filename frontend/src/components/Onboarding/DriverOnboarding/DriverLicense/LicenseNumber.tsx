import { Stack, Text, TextInput } from "@mantine/core";

import type { UploadProps } from "~/types/Onboarding/Driver";
import classes from "../../Onboarding.module.css";
export const LicenseNumber = ({ updateLicense, form }: UploadProps) => {
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>Enter the licence number exactly as it appears on your card.</Text>
      <TextInput
        label="Driver licence number"
        placeholder="Enter licence number"
        size="md"
        radius="md"
        value={form.license.number ?? ""}
        onChange={(e) => updateLicense("number", e.currentTarget.value)}
      />
    </Stack>
  );
};
