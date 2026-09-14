import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import {
  IconCar,
  IconCheck,
  IconClock,
  IconCurrencyDollar,
  IconMapPin,
  IconNavigation,
  IconRoute,
  IconShieldCheck,
  IconUser,
} from "@tabler/icons-react";
import { useLoaderData } from "react-router-dom";
import type { RequestRideResponse } from "~/types/trips";
import { useUserStore } from "~/zustand/userStore";
import {
  getDollarsAndCents,
  getHoursMinutesSeconds,
  getMetersKilometers,
} from "~/utils/measuringUnits";
import classes from "./Trip.module.css";

const stages = [
  {
    status: "REQUESTED",
    rider: "Ride requested",
    driver: "Request received",
    icon: IconCheck,
  },
  {
    status: "ACCEPTED",
    rider: "Driver assigned",
    driver: "Head to pickup",
    icon: IconCar,
  },
  {
    status: "ARRIVED",
    rider: "Driver has arrived",
    driver: "You have arrived",
    icon: IconMapPin,
  },
  {
    status: "IN_PROGRESS",
    rider: "On the way",
    driver: "Trip in progress",
    icon: IconNavigation,
  },
  {
    status: "COMPLETED",
    rider: "Trip complete",
    driver: "Trip complete",
    icon: IconCheck,
  },
] as const;

const stageIndex = (status: string) => {
  const index = stages.findIndex(
    (stage) => stage.status === status.toUpperCase(),
  );
  return index === -1 ? 0 : index;
};

export const Trip = () => {
  const trip = useLoaderData() as RequestRideResponse;
  const isDriver = useUserStore((state) => state.role) === "driver";
  const activeStage = stageIndex(trip.status);
  const pickup = {
    lat: Number(trip.pickupLatitude),
    lng: Number(trip.pickupLongitude),
  };
  const destination = {
    lat: Number(trip.destinationLatitude),
    lng: Number(trip.destinationLongitude),
  };
  const center = {
    lat: (pickup.lat + destination.lat) / 2,
    lng: (pickup.lng + destination.lng) / 2,
  };
  const currentStage = stages[activeStage];
  const destinationForDirections = isDriver ? pickup : destination;

  return (
    <Box className={classes.page}>
      <Box className={classes.shell}>
        <Box className={classes.header}>
          <Stack gap={4}>
            <Text className={classes.eyebrow}>ACTIVE TRIP · #{trip.id}</Text>
            <Title order={1} c="dark.9">
              {isDriver ? currentStage.driver : currentStage.rider}
            </Title>
            <Text c="dimmed">
              {isDriver
                ? "Follow trip progress and keep your rider informed."
                : "Your trip updates will appear here in real time."}
            </Text>
          </Stack>
          <Badge
            className={classes.status}
            color="rideshare"
            size="lg"
            radius="sm"
            variant="light"
          >
            {trip.status.replaceAll("_", " ")}
          </Badge>
        </Box>

        <Box className={classes.workspace}>
          <Card className={classes.mapCard} padding={0} radius="lg" withBorder>
            <TripMap
              pickup={pickup}
              destination={destination}
              center={center}
            />
          </Card>

          <Stack className={classes.side} gap="md">
            <Card
              className={classes.progressCard}
              withBorder
              radius="lg"
              padding="lg"
            >
              <Text fw={750} mb="lg">
                Trip progress
              </Text>
              <Stack gap={0}>
                {stages.map((stage, index) => {
                  const StageIcon = stage.icon;
                  const current = index === activeStage;
                  const complete = index < activeStage;
                  return (
                    <Box key={stage.status}>
                      <Box className={classes.step}>
                        <Box
                          className={classes.stepIcon}
                          data-complete={complete || undefined}
                          data-current={current || undefined}
                        >
                          {complete ? (
                            <IconCheck size={16} />
                          ) : (
                            <StageIcon size={16} />
                          )}
                        </Box>
                        <Stack gap={1} pb={index === stages.length - 1 ? 0 : 2}>
                          <Text
                            fw={current ? 750 : 550}
                            size="sm"
                            c={index <= activeStage ? "dark.9" : "dimmed"}
                          >
                            {isDriver ? stage.driver : stage.rider}
                          </Text>
                          {current && (
                            <Text size="xs" c="rideshare.7">
                              Current status
                            </Text>
                          )}
                        </Stack>
                      </Box>
                      {index < stages.length - 1 && (
                        <Box className={classes.stepLine} />
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Card>

            <Card
              className={classes.routeCard}
              withBorder
              radius="lg"
              padding="lg"
            >
              <Text fw={750} mb="md">
                Route details
              </Text>
              <RouteDetails trip={trip} />
              <Divider my="md" />
              <SimpleGrid cols={3} spacing="sm">
                <Metric
                  icon={<IconRoute size={15} />}
                  value={getMetersKilometers(
                    Number(trip.estimatedDistanceMeters),
                  )}
                  label="Distance"
                />
                <Metric
                  icon={<IconClock size={15} />}
                  value={getHoursMinutesSeconds(
                    Number(trip.estimatedDurationSeconds),
                  )}
                  label="Estimate"
                />
                <Metric
                  icon={<IconCurrencyDollar size={15} />}
                  value={getDollarsAndCents(Number(trip.fareCents))}
                  label="Fare"
                />
              </SimpleGrid>
            </Card>

            <Card withBorder radius="lg" padding="lg">
              <Group gap="sm" wrap="nowrap" align="flex-start">
                <ThemeIcon
                  variant="light"
                  color="rideshare"
                  radius="xl"
                  size="lg"
                >
                  <IconShieldCheck size={19} />
                </ThemeIcon>
                <Box>
                  <Text fw={700} size="sm">
                    Trip safety
                  </Text>
                  <Text c="dimmed" size="xs">
                    Share your trip status or contact support whenever you need
                    help.
                  </Text>
                </Box>
              </Group>
              <Group grow mt="md">
                <Button
                  component="a"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${destinationForDirections.lat},${destinationForDirections.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  leftSection={<IconNavigation size={16} />}
                >
                  {isDriver ? "Directions to pickup" : "View destination"}
                </Button>
                <Button variant="default" leftSection={<IconUser size={16} />}>
                  Contact
                </Button>
              </Group>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

const TripMap = ({
  pickup,
  destination,
  center,
}: {
  pickup: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral;
}) => (
  <Box className={classes.mapWrap}>
    <Box className={classes.mapHeader}>
      <Group gap={7} wrap="nowrap">
        <IconRoute size={17} color="var(--mantine-color-rideshare-7)" />
        <Text fw={700} size="sm">
          Route overview
        </Text>
      </Group>
    </Box>
    <Map
      defaultCenter={center}
      defaultZoom={13}
      mapId={import.meta.env.VITE_MAP_ID}
      style={{ height: "100%", width: "100%" }}
    >
      <AdvancedMarker position={pickup}>
        <Pin background="#087537" borderColor="#ffffff" glyphColor="#ffffff" />
      </AdvancedMarker>
      <AdvancedMarker position={destination}>
        <Pin background="#f08c00" borderColor="#ffffff" glyphColor="#ffffff" />
      </AdvancedMarker>
    </Map>
  </Box>
);

const RouteDetails = ({ trip }: { trip: RequestRideResponse }) => (
  <Box className={classes.routeLine}>
    <Box className={classes.routeMarkers}>
      <Box className={classes.point} />
      <Box className={classes.routeDashed} />
      <Box className={`${classes.point} ${classes.pointDestination}`} />
    </Box>
    <Stack gap="lg">
      <Box>
        <Text c="dimmed" size="xs" fw={700} tt="uppercase">
          Pickup
        </Text>
        <Text fw={650} size="sm">
          {trip.pickupAddress}
        </Text>
      </Box>
      <Box>
        <Text c="dimmed" size="xs" fw={700} tt="uppercase">
          Destination
        </Text>
        <Text fw={650} size="sm">
          {trip.destinationAddress}
        </Text>
      </Box>
    </Stack>
  </Box>
);

const Metric = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <Box className={classes.metric}>
    <Group gap={4} wrap="nowrap">
      <Text c="rideshare.7">{icon}</Text>
      <Text className={classes.metricValue} size="sm">
        {value}
      </Text>
    </Group>
    <Text c="dimmed" size="xs" mt={3}>
      {label}
    </Text>
  </Box>
);
