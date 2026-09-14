import type { driverProfile } from "~/types/Onboarding/Driver";
import type { riderProfile } from "~/types/Onboarding/Rider";
import { RequestMethods, type RequestResolve } from "~/types/request";
import type { newUser, User } from "~/types/user";
import { request } from "~/utils/requests/requests";

export const getUser = async (): Promise<RequestResolve<User>> =>
  await request(RequestMethods.POST, "api/users/bootstrap");

export const updateRiderOnboarding = async (
  id: string,
  profile: string,
): Promise<RequestResolve<riderProfile>> =>
  await request(
    RequestMethods.PATCH,
    `api/onboarding/rider/${id}`,
    undefined,
    profile,
  );

export const updateDriverOnboarding = async (
  id: string,
  profile: string,
): Promise<RequestResolve<driverProfile>> =>
  await request(
    RequestMethods.PATCH,
    `api/onboarding/driver/${id}`,
    undefined,
    profile,
  );

export const checkRiderOnboarding = async (
  id: string,
): Promise<RequestResolve<riderProfile>> =>
  await request(RequestMethods.GET, `api/onboarding/rider/state/${id}`);

export const checkDriverOnboarding = async (
  id: string,
): Promise<RequestResolve<driverProfile>> =>
  await request(RequestMethods.GET, `api/onboarding/driver/state/${id}`);

export const createUser = async (
  body: newUser,
): Promise<RequestResolve<User>> =>
  await request(
    RequestMethods.POST,
    "api/public/create-user",
    undefined,
    JSON.stringify(body),
  );
