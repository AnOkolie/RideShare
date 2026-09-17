import { Box, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconChevronRight, IconNavigation, IconRoute } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { RequestRideResponse } from "~/types/trips";
import { getHoursMinutesSeconds, getMetersKilometers } from "~/utils/measuringUnits";
import { useUserStore } from "~/zustand/userStore";
import classes from "./ActiveTrip.module.css";

type ActiveTripProps = { trip: RequestRideResponse };

const statusLabel = (status: string, isDriver: boolean) => {
  switch (status) {
    case "ACCEPTED":
      return isDriver ? "Head to pickup" : "Driver is on the way";
    case "ARRIVED":
      return isDriver ? "Rider is boarding" : "Your driver has arrived";
    case "IN_PROGRESS":
      return "Trip in progress";
    default:
      return "Active trip";
  }
};

export const ActiveTrip = ({ trip }: ActiveTripProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isDriver = useUserStore((state) => state.role) === "driver";
  const headingToPickup = isDriver && trip.status === "ACCEPTED";
  const nextStop = headingToPickup ? trip.pickupAddress : trip.destinationAddress;

  const openTrip = () => {
    queryClient.setQueryData(["trip", trip.id], trip);
    queryClient.setQueryData(["active-trip"], trip);
    navigate(`/trips/${trip.id}`);
  };

  return (
    <UnstyledButton className={classes.card} onClick={openTrip} aria-label="Open active trip">
      <Box className={classes.content}>
        <ThemeIcon className={classes.icon} color="rideshare" radius="xl" size={42} variant="light">
          {headingToPickup ? <IconNavigation size={21} /> : <IconRoute size={21} />}
        </ThemeIcon>
        <Box miw={0}>
          <Text className={classes.eyebrow}>ACTIVE TRIP</Text>
          <Text className={classes.title}>{statusLabel(trip.status, isDriver)}</Text>
          <Text className={classes.subtitle}>{nextStop}</Text>
        </Box>
        <IconChevronRight className={classes.chevron} size={20} />
      </Box>
      <Group className={classes.footer} gap="md" wrap="nowrap">
        <Text className={classes.metric}>Distance<strong>{getMetersKilometers(Number(trip.estimatedDistanceMeters))}</strong></Text>
        <Text className={classes.metric}>Estimate<strong>{getHoursMinutesSeconds(Number(trip.estimatedDurationSeconds))}</strong></Text>
      </Group>
    </UnstyledButton>
  );
};
