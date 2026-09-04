import { RequestMethods, type RequestResolve } from "~/types/request";
import type { vehicleMake, vehicleModel } from "~/types/vehicle";
import { request } from "~/utils/requests/requests";

export const getMake = async (): Promise<RequestResolve<vehicleMake>> =>
  await request(RequestMethods.GET, "api/vehicle/makes");

export const getModels = async (
  make: string,
): Promise<RequestResolve<vehicleModel>> =>
  await request(RequestMethods.GET, `api/vehicle/models?make=${make}`);
