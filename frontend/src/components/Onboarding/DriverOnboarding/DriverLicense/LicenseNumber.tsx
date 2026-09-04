import { Stack, Text, TextInput } from "@mantine/core";

import type { UploadProps } from "~/types/Onboarding/Driver";
export const LicenseNumber = ({ updateLicense, form }: UploadProps) => {
  return (
    <Stack>
      <Text>License Number</Text>
      <TextInput
        value={form.license.number ?? ""}
        onChange={(e) => updateLicense("number", e.currentTarget.value)}
      />
    </Stack>
  );
};
