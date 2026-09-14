import { getTripOptions } from "~/api/trips";
import type { ActionFunctionArgs } from "react-router";
import { acceptRide as apiAcceptRide } from "~/api/trips";
export const driverAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "request-ride":
      return driver(formData);
    case "accept-ride":
      return acceptRide(formData);
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

export const acceptRide = async (formData: FormData) => {
  if (!formData) return;
  const tripId = formData.get("tripId")?.toString();
  const driverId = formData.get("driverId")?.toString();
  if (!tripId || !driverId) return;
  const body = { driverId };
  return await apiAcceptRide(tripId, body);
};
