import { calculateFare } from "~/api/trips";
import type { ActionFunctionArgs } from "react-router";
import { requestRide as rideRequest } from "~/api/trips";
export const riderAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "quote":
      return rider(formData);
    case "request-ride":
      return requestRide(formData);
  }
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

const requestRide = async (formData: FormData) => {
  const pickupLatitude = getNumberField(formData, "pickup-latitude");
  const pickupLongitude = getNumberField(formData, "pickup-longitude");
  const destinationLatitude = getNumberField(formData, "destination-latitude");
  const destinationLongitude = getNumberField(
    formData,
    "destination-longitude",
  );
  const estimatedDistanceMeters = getNumberField(
    formData,
    "estimatedDistanceMeters",
  );
  const estimatedDurationSeconds = getNumberField(
    formData,
    "estimatedDurationSeconds",
  );
  const estimatedFareCents = getNumberField(formData, "estimatedFareCents");

  if (
    pickupLatitude === undefined ||
    pickupLongitude === undefined ||
    destinationLatitude === undefined ||
    destinationLongitude === undefined ||
    estimatedDistanceMeters === undefined ||
    estimatedDurationSeconds === undefined ||
    estimatedFareCents === undefined
  ) {
    return null;
  }

  const body = {
    trip: {
      pickupLatitude,
      pickupLongitude,
      destinationAddress: "",
      destinationLatitude,
      destinationLongitude,
    },
    fare: {
      estimatedDistanceMeters,
      estimatedDurationSeconds,
      estimatedFareCents,
    },
  };
  const response = await rideRequest(body);
  console.log("ride response is: ", response);
  return response;
};

const getNumberField = (formData: FormData, field: string) => {
  const value = formData.get(field);
  if (typeof value !== "string" || value.trim() === "") return undefined;

  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};
