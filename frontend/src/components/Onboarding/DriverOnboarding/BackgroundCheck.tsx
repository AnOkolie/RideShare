import { Checkbox, Stack, Text } from "@mantine/core";
import type { BackgroundCheckProps } from "~/types/Onboarding/Driver";
import { BACKGROUND_CONSENT_TEXT, BACKGROUND_DISCLOSURE_TEXT } from "~/utils/string";
import classes from "../Onboarding.module.css";

export const BackgroundCheck = ({
  form,
  updateBackground,
}: BackgroundCheckProps) => {
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>{BACKGROUND_DISCLOSURE_TEXT}</Text>
      <Stack className={classes.consentBox} gap="md">
        <Text size="sm">{BACKGROUND_CONSENT_TEXT}</Text>
        <Checkbox
          label="I have read the disclosure and consent to a background check."
          required
          checked={form.background.consent}
          onChange={(e) => updateBackground("consent", e.target.checked)}
        />
      </Stack>
    </Stack>
  );
};
