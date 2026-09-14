import { Stack, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { todaysDate } from "~/utils/date";
import type { UploadProps } from "~/types/Onboarding/Driver";
import classes from "../../Onboarding.module.css";
export const ExpiryUpload = ({ updateLicense }: UploadProps) => {
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>Choose the expiry date printed on your driver licence.</Text>
      <DateInput
        label="Licence expiry date"
        defaultValue={todaysDate()}
        size="md"
        radius="md"
        onChange={(e) => updateLicense("expiry", e)}
      />
    </Stack>
  );
};
