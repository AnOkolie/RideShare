import { Stack, Title, TextInput } from "@mantine/core";
import { driverStore } from "~/zustand/driverStore";

export const VehicleInfo = () => {
  const vehicle = driverStore((s) => s.driver.vehicle);
  console.log(vehicle);
  return (
    <Stack>
      <Title>Vehicle Information</Title>
      <TextInput label="Year" value={vehicle.year ?? null} />
      <TextInput label="Make" value={vehicle.make ?? null} />
      <TextInput label="Model" value={vehicle.model ?? null} />
      <TextInput label="Colour" value={vehicle.color ?? null} />
      <TextInput label="License Plate" value={vehicle.LicensePlate ?? null} />
    </Stack>
  );
};
