import { Group, Indicator, Stack, Text } from "@mantine/core";
import { driverStore } from "~/zustand/driverStore";

type approvalStatus = "APPROVED" | "PENDING" | "REJECTED";
type availabilityStatus = "accepted" | "declined";
const approvalMap: Record<approvalStatus, string> = {
  APPROVED: "green",
  PENDING: "yellow",
  REJECTED: "red",
};

const availabilityMap: Record<availabilityStatus, string> = {
  accepted: "green",
  declined: "red",
};

export const DriverStatus = () => {
  const driver = driverStore((s) => s.driver);
  return (
    <Stack>
      {driver?.approvalStatus && (
        <Group>
          <Indicator c={approvalMap[driver.approvalStatus]} />
          <Text>{driver?.approvalStatus}</Text>
        </Group>
      )}
      {driver?.status && (
        <Group>
          <Indicator c={availabilityMap[driver.status]} />
          <Text>{driver.status}</Text>
        </Group>
      )}
    </Stack>
  );
};
