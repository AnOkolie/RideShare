import {
  Badge,
  Box,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconAt, IconPhone, IconShieldCheck, IconUser } from "@tabler/icons-react";
import type { riderStructure } from "~/types/riderProfile";
import { useUserStore } from "~/zustand/userStore";
import classes from "./Profile.module.css";

type PersonalInfoProps = {
  handleFieldChange: (
    key: keyof riderStructure["personalInfo"],
    value: string,
  ) => void;
};

export const PersonalInfo = ({ handleFieldChange }: PersonalInfoProps) => {
  const user = useUserStore((state) => state.user);

  return (
    <Stack className={classes.formSection} gap="lg">
      <Box>
        <Title order={2}>Personal information</Title>
        <Text c="dimmed" mt={4} size="sm">
          Update the details associated with your RideShare account.
        </Text>
      </Box>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <TextInput
          defaultValue={user?.firstName}
          label="First name"
          leftSection={<IconUser size={17} />}
          onChange={(event) => handleFieldChange("firstName", event.currentTarget.value)}
          size="md"
        />
        <TextInput
          defaultValue={user?.lastName}
          label="Last name"
          leftSection={<IconUser size={17} />}
          onChange={(event) => handleFieldChange("lastName", event.currentTarget.value)}
          size="md"
        />
      </SimpleGrid>

      <Card className={classes.readOnlyCard} padding="md" radius="md" withBorder>
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <ThemeIcon color="rideshare" radius="md" variant="light">
              <IconAt size={18} />
            </ThemeIcon>
            <Box>
              <Text c="dimmed" size="xs">Email address</Text>
              <Text fw={600} size="sm">{user?.email ?? "Not provided"}</Text>
            </Box>
          </Group>
          <Badge color={user?.emailVerified ? "green" : "yellow"} leftSection={<IconShieldCheck size={12} />} variant="light">
            {user?.emailVerified ? "Verified" : "Verification needed"}
          </Badge>
        </Group>
      </Card>

      <Card className={classes.readOnlyCard} padding="md" radius="md" withBorder>
        <Group gap="sm" wrap="nowrap">
          <ThemeIcon color="rideshare" radius="md" variant="light">
            <IconPhone size={18} />
          </ThemeIcon>
          <Box>
            <Text c="dimmed" size="xs">Phone number</Text>
            <Text fw={600} size="sm">{user?.phoneNumber ?? "Not provided"}</Text>
          </Box>
        </Group>
      </Card>
    </Stack>
  );
};
