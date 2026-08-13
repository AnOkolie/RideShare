import {
  Button,
  Card,
  Text,
  Title,
  Stack,
  Badge,
  Box,
  Center,
  SimpleGrid,
  ThemeIcon,
} from "@mantine/core";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import {
  DRIVER_CHOICE,
  DRIVER_CHOICE_BTN,
  DRIVER_CHOICE_SUBTITLE,
  RIDER_CHOICE,
  RIDER_CHOICE_BTN,
  RIDER_CHOICE_SUBTITLE,
  WELCOME_TEXT,
} from "~/utils/string";

import { IconCar, IconUser } from "@tabler/icons-react";
import { useUserStore } from "~/zustand/userStore";
import { AppLogo } from "../Images/AppLogo";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
export const RoleChoice = () => {
  const setRole = useUserStore.getState().setRole;
  const navigate = useNavigate();
  const submit = useSubmit();
  const [userRole, setUserRole] = useState<"driver" | "rider">();
  type options = {
    title: string;
    subtitle: string;
    btn_text: string;
    choice: "driver" | "rider";
  };
  const choices: options[] = [
    {
      title: DRIVER_CHOICE,
      subtitle: DRIVER_CHOICE_SUBTITLE,
      btn_text: DRIVER_CHOICE_BTN,
      choice: "driver",
    },
    {
      title: RIDER_CHOICE,
      subtitle: RIDER_CHOICE_SUBTITLE,
      btn_text: RIDER_CHOICE_BTN,
      choice: "rider",
    },
  ];

  const actionData = useActionData();

  useEffect(() => {
    if (!actionData) return;
    console.log("action data", actionData);
    if (actionData.error) {
      navigate(`${userRole}`);
      return;
    }
    navigate(`/${userRole}`);
  }, [actionData]);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userRole) return;
    const formData = new FormData(e.currentTarget);
    formData.append("type", userRole);
    setRole(userRole);

    submit(formData, {
      method: "POST",
      action: "/onboarding",
    });
  };
  return (
    <Center mih="100vh" p="md">
      <Stack w="100%" maw={760} gap="xl">
        <Stack align="center" gap="xs">
          <AppLogo />

          <Badge variant="light" color="blue">
            One quick step
          </Badge>

          <Title order={1} ta="center">
            {WELCOME_TEXT}
          </Title>

          <Text c="dimmed" ta="center" maw={500}>
            Choose how you’d like to use the app today. You can switch roles
            later.
          </Text>
        </Stack>

        <Form method="post" onSubmit={handleSubmit}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {choices.map((choice) => {
              const isDriver = choice.choice === "driver";

              return (
                <Card
                  key={choice.choice}
                  withBorder
                  radius="lg"
                  padding="xl"
                  shadow="sm"
                  style={{
                    transition: "transform 150ms ease, box-shadow 150ms ease",
                  }}
                >
                  <Stack h="100%" justify="space-between" gap="xl">
                    <Stack gap="md">
                      <ThemeIcon
                        size={52}
                        radius="xl"
                        variant="light"
                        color={isDriver ? "orange" : "blue"}
                      >
                        {isDriver ? (
                          <IconCar size={28} />
                        ) : (
                          <IconUser size={28} />
                        )}
                      </ThemeIcon>

                      <Box>
                        <Title order={2}>{choice.title}</Title>
                        <Text c="dimmed" mt="xs">
                          {choice.subtitle}
                        </Text>
                      </Box>
                    </Stack>

                    <Button
                      fullWidth
                      size="md"
                      type="submit"
                      name="type"
                      value={choice.choice}
                      variant={isDriver ? "filled" : "light"}
                      color={isDriver ? "orange" : "blue"}
                      onClick={() => setUserRole(choice.choice)}
                    >
                      {choice.btn_text}
                    </Button>
                  </Stack>
                </Card>
              );
            })}
          </SimpleGrid>
        </Form>
      </Stack>
    </Center>
  );
};
