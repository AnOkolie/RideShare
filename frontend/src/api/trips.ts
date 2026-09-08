import { RequestMethods, type RequestResolve } from "~/types/request";
import type {
  calculateDistanceStructure,
  Distance,
  RequestQuoteStructure,
  RequestRideStructure,
  tripFare,
  TripOptions,
} from "~/types/trips";
import { request } from "~/utils/requests/requests";

export const getTripOptions = async (
  pickupLat: string,
  pickupLong: string,
  destLat: string,
  destLong: string,
): Promise<RequestResolve<TripOptions>> =>
  await request(
    RequestMethods.POST,
    "api/trips/options",
    undefined,
    JSON.stringify({
      pickupLat,
      pickupLong,
      destLat,
      destLong,
    }),
  );

export const calculateDistance = async (
  body: calculateDistanceStructure,
): Promise<RequestResolve<Distance>> =>
  await request(
    RequestMethods.POST,
    "api/routes/calculate",
    undefined,
    JSON.stringify(body),
  );

export const calculateFare = async (
  body: RequestQuoteStructure,
): Promise<RequestResolve<tripFare>> =>
  await request(
    RequestMethods.POST,
    "api/trips/quote",
    undefined,
    JSON.stringify(body),
  );

export const requestRide = async (
  body: RequestRideStructure,
): Promise<RequestResolve<RequestRideStructure>> =>
  await request(
    RequestMethods.POST,
    "api/trips/",
    undefined,
    JSON.stringify(body),
  );
