import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
  Title,
} from "@mantine/core";
import {
  IconBriefcase,
  IconChartBar,
  IconChevronRight,
  IconCurrencyDollar,
  IconUser,
} from "@tabler/icons-react";
import { DisplayMap } from "~/components/Address/DisplayMap";
import { useLocationHook } from "~/hooks/useDriverLocation";
import type { availabilityOptions } from "~/types/driverProfile";
import { driverStore } from "~/zustand/driverStore";
import classes from "./Driver.module.css";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useOfferContext } from "../AppLayout/VerifiedLayout";
import type { tripOffer } from "~/types/trips";
import { getMetersKilometers } from "~/utils/measuringUnits";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import { useUserStore } from "~/zustand/userStore";
import { QueryClient } from "@tanstack/react-query";

const statusColors: Record<availabilityOptions, string> = {
  ONLINE: "green",
  BUSY: "yellow",
  OFFLINE: "gray",
};

const TIMER_FOR_RIDE_ACCEPT = 10;

export const Driver = () => {
  const status = driverStore((state) => state.status);
  const { coord } = useLocationHook();
  const [timer, setTimer] = useState(TIMER_FOR_RIDE_ACCEPT);
  const [offer, setOffer] = useState<tripOffer | undefined>(undefined);
  const trip = useOfferContext();
  useEffect(() => {
    if (trip) {
      setOffer(trip);
      setTimer(TIMER_FOR_RIDE_ACCEPT);
    }
  }, [trip]);
  useEffect(() => {
    if (timer > 0) return;
    setOffer(undefined);
  }, [timer]);

  return (
    <Box className={classes.page}>
      <Box className={classes.topBar}>
        <Stack gap={4}>
          <Title order={1}>Drive</Title>
          <Text c="dimmed" size="lg">
            You're{" "}
            <Text component="span" c={`${statusColors[status]}.7`} fw={700}>
              {status.toLowerCase()}
            </Text>{" "}
            and ready to receive trips
          </Text>
        </Stack>

        <Stack gap={7} className={classes.availability}>
          <Text fw={600} size="sm">
            Availability
          </Text>
          <Sidebar status={status} />
        </Stack>
      </Box>

      <Card className={classes.mapWorkspace} padding={0} radius={0} withBorder>
        <DisplayMap
          className={classes.map}
          height="100%"
          lat={coord?.latitude}
          lng={coord?.longitude}
          marker="car"
          zoom={14}
          showCurrentLocationButton
        />
        <Box className={classes.mapWash} />

        {timer > 0 && offer && (
          <TripRequestCard timer={timer} setTimer={setTimer} trip={offer} />
        )}

        <Stack className={classes.statsRail} gap="md">
          <EarningsCard />
          <ProgressCard />
        </Stack>
      </Card>
    </Box>
  );
};

type SidebarProps = { status: availabilityOptions };

export const Sidebar = ({ status }: SidebarProps) => {
  const options = ["ONLINE", "BUSY", "OFFLINE"] as const;
  const setStatus = driverStore((state) => state.setStatus);

  return (
    <Card className={classes.statusControl} padding={0} radius="md" withBorder>
      <Group gap={0} wrap="nowrap">
        {options.map((option) => (
          <UnstyledButton
            key={option}
            aria-pressed={status === option}
            className={classes.statusOption}
            data-active={status === option || undefined}
            onClick={() => setStatus(option)}
            px="lg"
            py="md"
          >
            <Group gap={8} justify="center" wrap="nowrap">
              <Box
                aria-hidden
                bg={statusColors[option]}
                className={classes.statusDot}
              />
              <Text fw={status === option ? 700 : 500} size="sm">
                {option.charAt(0) + option.slice(1).toLowerCase()}
              </Text>
            </Group>
          </UnstyledButton>
        ))}
      </Group>
    </Card>
  );
};

type requestCardProps = {
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  trip: tripOffer;
};
const TripRequestCard = ({ timer, trip, setTimer }: requestCardProps) => {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigate = useNavigate();
  useEffect(() => {
    let intervalId = null;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && intervalId) {
      clearInterval(intervalId);
    }
    return () => {
      // setOffer(undefined);
      if (intervalId) clearInterval(intervalId);
    };
  }, [timer]);
  useEffect(() => {
    if (!actionData) return;
    if (actionData.data) {
      const trip = actionData.data;
      const queryClient = new QueryClient();
      queryClient.setQueryData(["trip", trip.id], trip);
      queryClient.setQueryData(["active-trip"], trip);
      navigate(`/trips/${trip.id}`);
    }
  });
  const user = useUserStore((s) => s.user);
  const acceptTrip = (tripId: string, driverId: string | undefined) => {
    if (!driverId || !tripId || driverId === undefined) return;
    const formData = new FormData();
    formData.append("tripId", tripId);
    formData.append("driverId", driverId);
    formData.append("intent", "accept-ride");
    submit(formData, {
      action: "/driver",
      method: "PATCH",
    });
  };
  return (
    <Card
      className={classes.tripRequest}
      padding="lg"
      radius="md"
      shadow="md"
      withBorder
    >
      <Progress value={(timer / TIMER_FOR_RIDE_ACCEPT) * 100} />
      <Group justify="space-between" mb="lg">
        <Text className={classes.requestPill} size="xs" fw={700}>
          New trip request
        </Text>
        <Text c="dimmed" size="sm">
          15s
        </Text>
      </Group>

      <Group align="stretch" gap="sm" wrap="nowrap">
        <Box className={classes.tripLine}>
          <Box className={classes.pickupDot} />
          <Box className={classes.line} />
          <Box className={classes.dropoffDot} />
        </Box>
        <Stack gap="lg">
          <Box>
            <Text fw={700}>
              {getMetersKilometers(trip.estimatedDistanceMeters)}
            </Text>
            <Text c="dimmed" mt={14} size="sm">
              Pickup near
            </Text>
            <Text fw={600} size="sm">
              {trip.pickupAddress}
            </Text>
            <Text c="dimmed" size="sm">
              Riverside, CA
            </Text>
          </Box>
          <Box>
            <Text c="dimmed" size="sm">
              Drop-off
            </Text>
            <Text fw={600} size="sm">
              {trip.destinationAddress}
            </Text>
            <Text c="dimmed" size="sm">
              Downtown, CA
            </Text>
          </Box>
        </Stack>
      </Group>

      <Divider my="md" />
      <Group gap="lg" mb="md">
        <Group gap={5}>
          <IconUser size={16} />
          <Text size="sm">1 rider</Text>
        </Group>
        <Group gap={5}>
          <IconBriefcase size={16} />
          <Text size="sm">Standard</Text>
        </Group>
      </Group>
      <Group grow>
        <Button color="gray" variant="default">
          Decline
        </Button>
        <Button color="green" onClick={() => acceptTrip(trip.tripId, user?.id)}>
          Accept
        </Button>
      </Group>
    </Card>
  );
};

const EarningsCard = () => (
  <Card
    className={classes.statCard}
    padding="lg"
    radius="md"
    shadow="md"
    withBorder
  >
    <Text fw={600}>Today's earnings</Text>
    <Group gap={4} align="baseline" mt="xs">
      <Text className={classes.earningsValue}>$0.00</Text>
      <Text c="dimmed" size="sm">
        after fees
      </Text>
    </Group>
    <Divider my="md" />
    <StatRow label="Trips" value="0" />
    <StatRow label="Online time" value="0h 00m" />
    <StatRow label="Active time" value="0h 00m" />
    <Button
      className={classes.earningsButton}
      color="green"
      fullWidth
      mt="md"
      variant="light"
    >
      <Group gap={8}>
        <IconChartBar size={18} />
        <Text size="sm">View earnings details</Text>
      </Group>
      <IconChevronRight size={18} />
    </Button>
  </Card>
);

const ProgressCard = () => (
  <Card
    className={classes.statCard}
    padding="lg"
    radius="md"
    shadow="md"
    withBorder
  >
    <Text fw={600}>Today's progress</Text>
    <Group mt="md" wrap="nowrap">
      <ThemeIcon color="green" radius="xl" size={54} variant="light">
        <IconCurrencyDollar size={27} />
      </ThemeIcon>
      <Stack gap={2} style={{ flex: 1 }}>
        <Text fw={700} c="green.7">
          $0{" "}
          <Text component="span" c="dark" fw={400}>
            / $200
          </Text>
        </Text>
        <Progress color="green" value={0} />
        <Text c="dimmed" size="xs">
          $200 to go
        </Text>
      </Stack>
    </Group>
  </Card>
);

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <Group justify="space-between" mb="sm">
    <Text c="dimmed" size="sm">
      {label}
    </Text>
    <Text fw={600} size="sm">
      {value}
    </Text>
  </Group>
);
