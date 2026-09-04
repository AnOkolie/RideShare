import {
  Group,
  Select,
  Stack,
  NumberInput,
  TextInput,
  ColorInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";

import type { VehicleProps } from "~/types/Onboarding/Driver";
import {
  formatMakeResponse,
  formatModelResponse,
} from "~/utils/formatResponse/formatVehicleResponse";

export const VehicleInfo = ({ form, updateVehicle }: VehicleProps) => {
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const make = formatMakeResponse(loaderData);
  const [models, setModels] = useState(fetcher.data);
  useEffect(() => {
    console.log("manufacturer: ", form.vehicle.make);
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
    console.log("response: ", fetcher.data);
    if (!fetcher.data) return;
    setModels(formatModelResponse(fetcher.data));
  }, [fetcher.data]);
  return (
    <Stack>
      <Group grow>
        <Select
          value={form.vehicle.make}
          label="Manufacturer"
          onChange={(e) => updateVehicle("make", e ?? "")}
          data={make}
        />
        <Select
          value={form.vehicle.model}
          label="Model"
          onChange={(e) => updateVehicle("model", e ?? "")}
          data={models}
        />
      </Group>
      <Group grow>
        <NumberInput
          label="Make Year"
          placeholder="Enter the year of the make"
          value={form.vehicle.year}
          onChange={(e) => updateVehicle("year", e.toString())}
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
