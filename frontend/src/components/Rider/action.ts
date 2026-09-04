import { calculateFare } from "~/api/trips";
import type { ActionFunctionArgs } from "react-router";
export const riderAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  return rider(formData);
};

const rider = async (formData: FormData) => {
  if (!formData) return;
  const pickupLat = formData.get("pickup-latitude")?.toString();
  const pickupLong = formData.get("pickup-longitude")?.toString();
  const destLat = formData.get("destination-latitude")?.toString();
  const destLong = formData.get("destination-longitude")?.toString();
  if (!pickupLat || !pickupLong || !destLat || !destLong) return;
  console.log("rider");
  const body = {
    pickupLatitude: Number(pickupLat),
    pickupLongitude: Number(pickupLong),
    destinationLatitude: Number(destLat),
    destinationLongitude: Number(destLong),
  };
  const result = await calculateFare(body);
  console.log(result);
  return result;
};
