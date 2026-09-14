import {
  Group,
  Select,
  Stack,
  NumberInput,
  TextInput,
  ColorInput,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";

import type { VehicleProps } from "~/types/Onboarding/Driver";
import {
  formatMakeResponse,
  formatModelResponse,
} from "~/utils/formatResponse/formatVehicleResponse";
import classes from "../Onboarding.module.css";

export const VehicleInfo = ({ form, updateVehicle }: VehicleProps) => {
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const make = formatMakeResponse(loaderData);
  const [models, setModels] = useState(fetcher.data);
  useEffect(() => {
    if (form.vehicle.make) {
      const formData = new FormData();
      formData.append("intent", "getModels");
      formData.append("make", form.vehicle.make);
      fetcher.submit(formData, {
        method: "POST",
        action: "/vehicle/model",
      });
    }
  }, [form.vehicle.make]);
  useEffect(() => {
    if (!fetcher.data) return;
    setModels(formatModelResponse(fetcher.data));
  }, [fetcher.data]);
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>
        Enter the vehicle you plan to use for RideShare trips. You can update it
        later if it changes.
      </Text>
      <Group grow>
        <Select
          value={form.vehicle.make}
          label="Manufacturer"
          size="md"
          radius="md"
          onChange={(e) => updateVehicle("make", e ?? "")}
          data={make}
        />
        <Select
          value={form.vehicle.model}
          label="Model"
          size="md"
          radius="md"
          onChange={(e) => updateVehicle("model", e ?? "")}
          data={models}
        />
      </Group>
      <Group grow>
        <NumberInput
          label="Make Year"
          size="md"
          radius="md"
          placeholder="Enter the year of the make"
          value={form.vehicle.year}
          onChange={(e) => updateVehicle("year", e.toString())}
        />
        <ColorInput
          label="Car colour"
          size="md"
          radius="md"
          value={form.vehicle.colour}
          onChange={(e) => updateVehicle("colour", e)}
        />
      </Group>
      <Group grow>
        <TextInput
          label="License Plate #"
          size="md"
          radius="md"
          value={form.vehicle.licensePlate}
          onChange={(e) => updateVehicle("licensePlate", e.target.value)}
        />
        <NumberInput
          label="# of Seats"
          size="md"
          radius="md"
          value={form.vehicle.seats}
          onChange={(e) => updateVehicle("seats", e)}
        />
      </Group>
    </Stack>
  );
};
