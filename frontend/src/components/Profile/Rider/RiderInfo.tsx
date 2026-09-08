import {
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconHome, IconLock, IconMapPin } from "@tabler/icons-react";
import type { riderStructure } from "~/types/riderProfile";
import { riderStore } from "~/zustand/riderStore";
import classes from "./RiderInfo.module.css";

type RiderInfoProps = {
  handleFieldChange: (
    key: keyof riderStructure["riderInfo"],
    value: string,
  ) => void;
};

export const RiderInfo = ({ handleFieldChange }: RiderInfoProps) => {
  const homeAddress = riderStore((state) => state.rider?.homeAddress) ?? "";

  return (
    <Stack className={classes.section} gap="lg">
      <Box>
        <Title order={2}>Rider information</Title>
        <Text c="dimmed" mt={4} size="sm">
          Manage the saved details that make requesting a ride faster.
        </Text>
      </Box>

      <Card className={classes.card} padding="lg" radius="md" withBorder>
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <ThemeIcon color="rideshare" radius="md" size="lg" variant="light">
              <IconHome size={21} />
            </ThemeIcon>
            <Box>
              <Text fw={700}>Home location</Text>
              <Text c="dimmed" size="sm">
                Used to speed up pickup selection when you request a trip.
              </Text>
            </Box>
          </Group>
          <Badge color="green" radius="sm" variant="light">
            Saved place
          </Badge>
        </Group>

        <Divider my="lg" />

        <TextInput
          defaultValue={homeAddress}
          description="Start typing a new address, then save your profile to update it."
          label="Home address"
          leftSection={<IconMapPin size={17} />}
          onChange={(event) =>
            handleFieldChange("homeAddress", event.currentTarget.value)
          }
          placeholder="Enter your home address"
          size="md"
        />

        <Group className={classes.privacyNote} gap={7} mt="lg" wrap="nowrap">
          <IconLock size={15} />
          <Text size="xs">
            Your saved address is private and is only used to prepare your ride requests.
          </Text>
        </Group>
      </Card>
    </Stack>
  );
};
