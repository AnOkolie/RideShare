import { getTripOptions } from "~/api/trips";
import type { ActionFunctionArgs } from "react-router";

export const addressAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  if (!formData) return;
  const pickupLat = formData.get("pickup-latitiude")?.toString();
  const pickupLong = formData.get("pickup-longitude")?.toString();
  const destLat = formData.get("destination-latitiude")?.toString();
  const destLong = formData.get("destination-longitude")?.toString();
  if (!pickupLat || !pickupLong || !destLat || !destLong) return;
  await getTripOptions(pickupLat, pickupLong, destLat, destLong);
};
