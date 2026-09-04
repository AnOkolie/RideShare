import { AddressField } from "../Address/AddressField";
import { Form, useActionData, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PlaceSelection } from "~/types/address/address";
import { useCalculateRiderDistance } from "~/hooks/useCalculateRiderDistance";
import {
  Box,
  Text,
  Title,
  Stack,
  UnstyledButton,
  Divider,
  Card,
  ThemeIcon,
  Group,
} from "@mantine/core";
import { IconBriefcase, IconHome, IconMapPin } from "@tabler/icons-react";
import classes from "./RiderHome.module.css";
import { DisplayMap } from "../Address/DisplayMap";
import type { tripFare } from "~/types/trips";
import { IconClock, IconRoute, IconReceiptDollar } from "@tabler/icons-react";
import {
  getDollarsAndCents,
  getHoursMinutesSeconds,
  getMetersKilometers,
} from "~/utils/measuringUnits";
export const Rider = () => {
  const submit = useSubmit();
  const [fare, setFare] = useState<tripFare | null>(null);
  const actionData = useActionData();
  const [destination, setDestination] = useState<PlaceSelection | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form");
    const form = new FormData();
    if (!geoCords || !destination) return;
    form.append("pickup-latitude", String(geoCords.latitude));
    form.append("pickup-longitude", String(geoCords.longitude));
    form.append("destination-latitude", String(destination?.latitude));
    form.append("destination-longitude", String(destination?.longitude));
    submit(form, {
      method: "POST",
      action: "/rider",
    });
  };
  useEffect(() => {
    if (!actionData) return;
    console.log("actionData", actionData.data);
    setFare(actionData.data);
  }, [actionData]);
  const { duration, geoCords } = useCalculateRiderDistance();
  useEffect(() => {});
  return (
    <Box className={classes.page} w="100%">
      <Stack gap="lg">
        <Title order={2}>Where are you going?</Title>
        <Text size="sm" c="dimmed" mt={4}>
          Choose a pickup point and destination to see available rides.
        </Text>

        <Box className={classes.bookingLayout}>
          <Card className={classes.mapPanel} padding={0} withBorder radius="md">
            <DisplayMap />
          </Card>

          <Card
            className={classes.bookingPanel}
            padding="lg"
            withBorder
            radius="md"
          >
            <Stack gap="md">
              <Box>
                <Text fw={700} size="sm" mb="xs">
                  Plan your trip
                </Text>

                <Form onSubmit={handleSubmit}>
                  <AddressField setDestination={setDestination} />
                </Form>
              </Box>

              {fare && <FareDetails fare={fare} />}

              <Divider label="Saved places" labelPosition="center" />

              <Stack gap={4}>
                <UnstyledButton className={classes.savedPlace}>
                  <ThemeIcon variant="light" color="ridewave" radius="xl">
                    <IconHome size={17} />
                  </ThemeIcon>

                  <Box>
                    <Text fw={700} size="sm">
                      Home
                    </Text>
                    <Text size="xs" c="dimmed">
                      {duration} away
                    </Text>
                  </Box>

                  <IconMapPin
                    className={classes.placeIcon}
                    size={18}
                    aria-hidden
                  />
                </UnstyledButton>

                <UnstyledButton className={classes.savedPlace}>
                  <ThemeIcon variant="light" color="ridewave" radius="xl">
                    <IconBriefcase size={17} />
                  </ThemeIcon>

                  <Box>
                    <Text fw={700} size="sm">
                      Work
                    </Text>
                    <Text size="xs" c="dimmed">
                      {duration} away
                    </Text>
                  </Box>

                  <IconMapPin
                    className={classes.placeIcon}
                    size={18}
                    aria-hidden
                  />
                </UnstyledButton>
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
};

type fareProps = {
  fare: tripFare;
};

const FareDetails = ({ fare }: fareProps) => {
  const distance = getMetersKilometers(fare.estimatedDistanceMeters);
  const duration = getHoursMinutesSeconds(fare.estimatedDurationSeconds);
  const price = getDollarsAndCents(fare.estimatedFareCents);

  return (
    <Card
      withBorder
      radius="md"
      padding="lg"
      style={{
        background: "var(--rw-surface)",
        borderColor: "var(--rw-border)",
      }}
    >
      <Group justify="space-between" align="center" wrap="nowrap">
        <Stack gap="sm">
          <Text size="sm" fw={700}>
            Estimated trip
          </Text>

          <Group gap="xs">
            <ThemeIcon variant="light" color="ridewave" radius="xl" size="sm">
              <IconRoute size={14} />
            </ThemeIcon>
            <Text size="sm" c="dimmed">
              {distance}
            </Text>
          </Group>

          <Group gap="xs">
            <ThemeIcon variant="light" color="ridewave" radius="xl" size="sm">
              <IconClock size={14} />
            </ThemeIcon>
            <Text size="sm" c="dimmed">
              {duration}
            </Text>
          </Group>
        </Stack>

        <Divider orientation="vertical" />

        <Stack gap={2} align="flex-end">
          <Group gap={6}>
            <IconReceiptDollar
              size={16}
              color="var(--mantine-color-ridewave-7)"
            />
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Estimate
            </Text>
          </Group>

          <Text size="xl" fw={800} c="ridewave.7">
            {price}
          </Text>

          <Text size="xs" c="dimmed">
            Final fare may vary
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};
