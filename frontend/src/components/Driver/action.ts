import { getTripOptions } from "~/api/trips";
import type { ActionFunctionArgs } from "react-router";
export const driverAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "request-ride":
      return driver(formData);
  }
};

const driver = async (formData: FormData) => {
  if (!formData) return;
  const pickupLat = formData.get("pickup-latitiude")?.toString();
  const pickupLong = formData.get("pickup-longitude")?.toString();
  const destLat = formData.get("destination-latitiude")?.toString();
  const destLong = formData.get("destination-longitude")?.toString();
  if (!pickupLat || !pickupLong || !destLat || !destLong) return;
  await getTripOptions(pickupLat, pickupLong, destLat, destLong);
};
