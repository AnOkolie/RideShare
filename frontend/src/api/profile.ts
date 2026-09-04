import type { driverProfile } from "~/types/Onboarding/Driver";
import { RequestMethods, type RequestResolve } from "~/types/request";
import type { riderUpdateResponse } from "~/types/riderProfile";
import { request } from "~/utils/requests/requests";

export const updateRiderProfile = async (
  id: string,
  form: string,
): Promise<RequestResolve<riderUpdateResponse>> =>
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
