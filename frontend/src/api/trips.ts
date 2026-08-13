import { RequestMethods, type RequestResolve } from "~/types/request";
import type { TripOptions } from "~/types/trips";
import { request } from "~/utils/requests/requests";

export const getTripOptions = async (
  pickupLat: string,
  pickupLong: string,
  destLat: string,
  destLong: string,
): Promise<RequestResolve<TripOptions>> =>
  await request(
    RequestMethods.POST,
    "/api/trips/options",
    undefined,
    JSON.stringify({
      pickupLat,
      pickupLong,
      destLat,
      destLong,
    }),
  );
