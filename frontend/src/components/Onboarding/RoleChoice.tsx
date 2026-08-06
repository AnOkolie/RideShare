import { Button, Card, Text, Title, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  DRIVER_CHOICE,
  DRIVER_CHOICE_BTN,
  DRIVER_CHOICE_SUBTITLE,
  RIDER_CHOICE,
  RIDER_CHOICE_BTN,
  RIDER_CHOICE_SUBTITLE,
  WELCOME_TEXT,
} from "~/utils/string";

export const RoleChoice = () => {
  const navigate = useNavigate();
  const choices = [
    {
      title: DRIVER_CHOICE,
      subtitle: DRIVER_CHOICE_SUBTITLE,
      btn_text: DRIVER_CHOICE_BTN,
      onClick: () => navigate("/onboarding/driver"),
    },
    {
      title: RIDER_CHOICE,
      subtitle: RIDER_CHOICE_SUBTITLE,
      btn_text: RIDER_CHOICE_BTN,
      onClick: () => navigate("/onboarding/rider"),
    },
  ];
  return (
    <Group>
      <Title>{WELCOME_TEXT}</Title>
      <Text>{DRIVER_CHOICE_SUBTITLE}</Text>
      {choices.map((choice) => (
        <Card>
          <Text>{choice.title}</Text>
          <Text>{choice.subtitle}</Text>
          <Button onClick={choice.onClick}>{choice.btn_text}</Button>
        </Card>
      ))}
    </Group>
  );
};
