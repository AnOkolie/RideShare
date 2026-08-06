import { Text, Title, Stack, List, ThemeIcon } from "@mantine/core";
import {
  DRIVER_ONBOARDING_REQ_LICENSE_TEXT,
  WELCOME_DRIVER_ONBOARDING_SUBTITLE,
  WELCOME_DRIVER_ONBOARDING_TEXT,
  DRIVER_ONBOARDING_REQ_INSURANCE_TEXT,
  DRIVER_ONBOARDING_REQ_PICTURE_TEXT,
  DRIVER_ONBOARDING_REQ_VEHICLE_TEXT,
} from "~/utils/string";
import { CheckCircleIcon } from "@phosphor-icons/react";
export const WelcomePage = () => {
  const requirements = [
    {
      text: DRIVER_ONBOARDING_REQ_LICENSE_TEXT,
    },
    {
      text: DRIVER_ONBOARDING_REQ_VEHICLE_TEXT,
    },
    {
      text: DRIVER_ONBOARDING_REQ_INSURANCE_TEXT,
    },
    {
      text: DRIVER_ONBOARDING_REQ_PICTURE_TEXT,
    },
  ];
  return (
    <Stack>
      <Title>{WELCOME_DRIVER_ONBOARDING_TEXT}</Title>
      <Text>{WELCOME_DRIVER_ONBOARDING_SUBTITLE}</Text>
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <CheckCircleIcon size={16} />
          </ThemeIcon>
        }
      >
        {requirements.map((req) => (
          <List.Item>{req.text}</List.Item>
        ))}
      </List>
    </Stack>
  );
};
