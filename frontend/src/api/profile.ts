import type { driverActionStructure } from "~/types/driverProfile";
import type { driverProfile } from "~/types/Onboarding/Driver";
import type { riderProfile } from "~/types/Onboarding/Rider";
import { RequestMethods, type RequestResolve } from "~/types/request";
import type { riderActionStructure } from "~/types/riderProfile";
import { request } from "~/utils/requests/requests";

export const updateRiderProfile = async (
  id: string,
  form: string,
): Promise<RequestResolve<riderProfile>> =>
  await request(
    RequestMethods.PATCH,
    `api/rider/update/${id}`,
    undefined,
    form,
  );

export const updateDriverProfile = async (
  id: string,
  form: string,
): Promise<RequestResolve<driverProfile>> =>
  await request(
    RequestMethods.PATCH,
    `api/driver/update/${id}`,
    undefined,
    JSON.stringify(form),
  );
