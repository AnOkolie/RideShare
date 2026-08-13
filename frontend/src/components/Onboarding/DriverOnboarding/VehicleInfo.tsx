import {
  Group,
  Select,
  Stack,
  NumberInput,
  TextInput,
  ColorInput,
} from "@mantine/core";

import type { VehicleProps } from "~/types/Onboarding/Driver";

export const VehicleInfo = ({ form, updateVehicle }: VehicleProps) => {
  return (
    <Stack>
      <Group grow>
        <Select
          value={form.vehicle.manufacturer}
          label="Manufacturer"
          onChange={(e) => updateVehicle("manufacturer", e ?? "")}
        />
        <Select
          value={form.vehicle.model}
          label="Model"
          onChange={(e) => updateVehicle("model", e ?? "")}
        ></Select>
      </Group>
      <Group grow>
        <NumberInput
          label="Make Year"
          placeholder="Enter the year of the make"
          value={form.vehicle.year}
        />
        <ColorInput
          label="Car colour"
          value={form.vehicle.colour}
          onChange={(e) => updateVehicle("colour", e)}
        />
      </Group>
      <Group grow>
        <TextInput
          label="License Plate #"
          value={form.vehicle.licensePlate}
          onChange={(e) => updateVehicle("licensePlate", e.target.value)}
        />
        <NumberInput
          label="# of Seats"
          value={form.vehicle.seats}
          onChange={(e) => updateVehicle("seats", e)}
        />
      </Group>
    </Stack>
  );
};
