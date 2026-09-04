import { Stack, Title, TextInput } from "@mantine/core";
import { driverStore } from "~/zustand/driverStore";

export const VehicleInfo = () => {
  const vehicle = driverStore((s) => s.driver?.vehicle);
  console.log(vehicle);
  return (
    <Stack>
      <Title>Vehicle Information</Title>
      <TextInput label="Year" value={vehicle?.year ?? undefined} />
      <TextInput label="Make" value={vehicle?.make ?? undefined} />
      <TextInput label="Model" value={vehicle?.model ?? undefined} />
      <TextInput label="Colour" value={vehicle?.color ?? undefined} />
      <TextInput
        label="License Plate"
        value={vehicle?.licensePlate ?? undefined}
      />
    </Stack>
  );
};
