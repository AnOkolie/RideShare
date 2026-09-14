import { AddressField } from "../Address/AddressField";
import { Form, useFetcher, type FetcherWithComponents } from "react-router-dom";
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
  Button,
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
import {
  RIDER_BTN,
  RIDER_CTA,
  RIDER_ESTIMATE,
  RIDER_ESTIMATED_TRIP,
  RIDER_FARE_DESC,
  RIDER_HEADER,
  RIDER_QUICK_SELECT_1,
  RIDER_QUICK_SELECT_2,
  RIDER_SUBHEADER,
} from "~/utils/string";
import { getAddressFromCoordinates } from "~/utils/address";
import { riderStore } from "~/zustand/riderStore";
import { useRiderLocation } from "~/hooks/useRiderLocation";
export const Rider = () => {
  const [fare, setFare] = useState<tripFare | null>(null);
  const [destination, setDestination] = useState<PlaceSelection | null>(null);
  const quoteFetcher = useFetcher();
  const rideRequestFetcher = useFetcher();
  const [rideType, setRideType] = useState<"home" | "work" | "generic">(
    "generic",
  );
  const rider = riderStore((s) => s.rider);
  type formStructure = {
    latitude: number;
    longitude: number;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = generateFormSubmission("quote");
    setRideType("generic");
    if (!form) return;
    quoteFetcher.submit(form, {
      method: "POST",
      action: "/rider",
    });
  };
  const requestRideSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("requesting ride");
    const dest =
      rideType === "home" && rider
        ? {
            latitude: rider.homeLatitude,
            longitude: rider.homeLongitude,
          }
        : undefined;
    const form = generateFormSubmission("request-ride", undefined, dest);
    if (!form || !geoCords) {
      console.log("something is missing");
      return;
    }
    const result = await getAddressFromCoordinates(
      geoCords.latitude,
      geoCords.longitude,
    );
    const address = result?.address;
    if (!address) return;
    form.append(
      "estimatedDistanceMeters",
      String(fare?.estimatedDistanceMeters),
    );
    form.append(
      "estimatedDurationSeconds",
      String(fare?.estimatedDurationSeconds),
    );
    form.append("estimatedFareCents", String(fare?.estimatedFareCents));
    switch (rideType) {
      case "home":
        if (!rider) return;
        appendAddressToRequest(form, address, rider.homeAddress);
        break;
      case "work":
      default:
        if (!destination) return;
        appendAddressToRequest(form, address, destination.address);
    }
    rideRequestFetcher.submit(form, {
      method: "POST",
      action: "/rider",
    });
  };
  const appendAddressToRequest = (
    form: FormData,
    pickup: string,
    destination: string,
  ) => {
    form.append("pickup-address", pickup);
    form.append("destination-address", destination);
    return form;
  };
  const generateFormSubmission = (
    intent: string,
    pickupCoord?: formStructure,
    dstCoord?: formStructure,
  ) => {
    const form = new FormData();
    const pickup = pickupCoord ?? geoCords;
    const dest = dstCoord ?? destination;
    if (!pickup || !dest) return;
    form.append("intent", intent);
    form.append("pickup-latitude", String(pickup.latitude));
    form.append("pickup-longitude", String(pickup.longitude));
    form.append("destination-latitude", String(dest?.latitude));
    form.append("destination-longitude", String(dest?.longitude));
    return form;
  };

  useEffect(() => {
    if (!quoteFetcher) return;
    console.log("actionData", quoteFetcher.data);
    setFare(quoteFetcher.data?.fare ?? null);
  }, [quoteFetcher]);

  const handleQuickSelect = async (type: "home" | "work") => {
    console.log("type: ", type);
    switch (type) {
      case "home":
        if (!rider) return;
        const home = {
          latitude: rider?.homeLatitude ?? 0,
          longitude: rider?.homeLongitude ?? 0,
        };
        setRideType("home");
        const form = generateFormSubmission("quote", undefined, home);
        if (!form || !geoCords) return;
        quoteFetcher.submit(form, {
          method: "POST",
          action: "/rider",
        });
        break;
      case "work":
        setRideType("work");
    }
  };
  const { duration, geoCords } = useCalculateRiderDistance();
  useRiderLocation();
  return (
    <Box className={classes.page} w="100%">
      <Stack gap="lg">
        <Title order={2}>{RIDER_HEADER}</Title>
        <Text size="sm" c="dimmed" mt={4}>
          {RIDER_CTA}
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
                  {RIDER_SUBHEADER}
                </Text>

                <Form onSubmit={handleSubmit}>
                  <AddressField setDestination={setDestination} />
                </Form>
              </Box>

              {fare && (
                <FareDetails
                  fare={fare}
                  handleSubmit={requestRideSubmit}
                  rideRequestFetcher={rideRequestFetcher}
                />
              )}

              <Divider label="Saved places" labelPosition="center" />

              <Stack gap={4}>
                <UnstyledButton className={classes.savedPlace}>
                  <ThemeIcon variant="light" color="ridewave" radius="xl">
                    <IconHome size={17} />
                  </ThemeIcon>

                  <Box onClick={() => handleQuickSelect("home")}>
                    <Text fw={700} size="sm">
                      {RIDER_QUICK_SELECT_1}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {duration}
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

                  <Box onClick={() => handleQuickSelect("home")}>
                    <Text fw={700} size="sm">
                      {RIDER_QUICK_SELECT_2}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {duration}
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
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  rideRequestFetcher: FetcherWithComponents<any>;
};

const FareDetails = ({ fare, handleSubmit, rideRequestFetcher }: fareProps) => {
  const distance = getMetersKilometers(fare.estimatedDistanceMeters);
  const duration = getHoursMinutesSeconds(fare.estimatedDurationSeconds);
  const price = getDollarsAndCents(fare.estimatedFareCents);
  console.log("Tip fare details: ", fare);
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
            {RIDER_ESTIMATED_TRIP}
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
              {RIDER_ESTIMATE}
            </Text>
          </Group>

          <Text size="xl" fw={800} c="ridewave.7">
            {price}
          </Text>

          <Text size="xs" c="dimmed">
            {RIDER_FARE_DESC}
          </Text>
        </Stack>
      </Group>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" loading={rideRequestFetcher.state !== "idle"}>
          {RIDER_BTN}
        </Button>
      </Form>
    </Card>
  );
};
