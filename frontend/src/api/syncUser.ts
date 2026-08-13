import type { syncUser } from "~/types/auth/auth";
import type { driverProfile } from "~/types/Onboarding/Driver";
import type { riderProfile } from "~/types/Onboarding/Rider";
import { RequestMethods, type RequestResolve } from "~/types/request";
import { request } from "~/utils/requests/requests";

export const getUser = async (): Promise<RequestResolve<syncUser>> =>
  await request(RequestMethods.POST, "api/users/bootstrap");

export const updateRiderOnboarding = async (id: string, status: boolean) =>
  await request(
    RequestMethods.PATCH,
    `api/onboarding/rider/${id}`,
    undefined,
    JSON.stringify({ status }),
  );

export const updateDriverOnboarding = async (id: string, status: boolean) =>
  await request(
    RequestMethods.PATCH,
    `api/onboarding/driver/${id}`,
    undefined,
    JSON.stringify({ status }),
  );

export const checkRiderOnboarding = async (
  id: string,
): Promise<RequestResolve<riderProfile>> =>
  await request(RequestMethods.GET, `api/onboarding/rider/state/${id}`);

export const checkDriverOnboarding = async (
  id: string,
): Promise<RequestResolve<driverProfile>> =>
  await request(RequestMethods.GET, `api/onboarding/driver/state/${id}`);
