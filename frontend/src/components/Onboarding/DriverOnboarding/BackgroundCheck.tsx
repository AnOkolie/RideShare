import { Checkbox, Stack, Text, Title } from "@mantine/core";
import type { BackgroundCheckProps } from "~/types/Onboarding/Driver";
import {
  BACKGROUND_CHECK_HEADER,
  BACKGROUND_CONSENT_TEXT,
  BACKGROUND_DISCLOSURE_TEXT,
} from "~/utils/string";

export const BackgroundCheck = ({
  form,
  updateBackground,
}: BackgroundCheckProps) => {
  return (
    <Stack>
      <Title>{BACKGROUND_CHECK_HEADER}</Title>
      <Text>{BACKGROUND_DISCLOSURE_TEXT}</Text>
      <Text>{BACKGROUND_CONSENT_TEXT}</Text>
      <Checkbox
        defaultChecked={form.background.consent}
        onChange={(e) => updateBackground("consent", e.target.checked)}
      />
    </Stack>
  );
};
