import { Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { todaysDate } from "~/utils/date";
import type { UploadProps } from "~/types/Onboarding/Driver";
export const ExpiryUpload = ({ updateLicense }: UploadProps) => {
  return (
    <Stack>
      <Text>Expiry date</Text>
      <DateInput
        defaultValue={todaysDate()}
        onChange={(e) => updateLicense("expiry", e)}
      />
    </Stack>
  );
};
