import { calculateFare } from "~/api/trips";
import type { ActionFunctionArgs } from "react-router";
import { requestRide as rideRequest } from "~/api/trips";
export const riderAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  console.log("intent: ", intent);
  switch (intent) {
    case "quote":
      const fare = await rider(formData);
      return { intent: "fare" as const, fare: fare?.data };
    case "request-ride":
      const trip = await requestRide(formData);
      return { intent: "request-ride" as const, trip: trip?.data };
    default:
      return { intent: "error" as const, message: "Unknown rider action" };
  }
};

const rider = async (formData: FormData) => {
  if (!formData) return;
  const pickupLat = formData.get("pickup-latitude")?.toString();
  const pickupLong = formData.get("pickup-longitude")?.toString();
  const destLat = formData.get("destination-latitude")?.toString();
  const destLong = formData.get("destination-longitude")?.toString();
  const pickupAddress = formData.get("pickup-address");
  const destinationAddress = formData.get("destination-address");
  if (
    !pickupLat ||
    !pickupLong ||
    !destLat ||
    !destLong ||
    !pickupAddress ||
    !destinationAddress
  )
    return;
  console.log("rider");
  const body = {
    pickupLatitude: Number(pickupLat),
    pickupLongitude: Number(pickupLong),
    destinationLatitude: Number(destLat),
    destinationLongitude: Number(destLong),
    pickupAddress: pickupAddress,
    destinationAddress,
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
  const pickupAddress = formData.get("pickup-address");
  const destinationAddress = formData.get("destination-address");

  if (
    pickupLatitude === undefined ||
    pickupLongitude === undefined ||
    destinationLatitude === undefined ||
    destinationLongitude === undefined ||
    estimatedDistanceMeters === undefined ||
    estimatedDurationSeconds === undefined ||
    estimatedFareCents === undefined ||
    pickupAddress === undefined ||
    destinationAddress === undefined
  ) {
    return null;
  }

  const body = {
    trip: {
      pickupLatitude,
      pickupLongitude,
      destinationAddress,
      destinationLatitude,
      destinationLongitude,
      pickupAddress,
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
