import type { ActionFunctionArgs } from "react-router-dom";
import {
  checkDriverOnboarding,
  checkRiderOnboarding,
  updateDriverOnboarding,
  updateRiderOnboarding,
} from "~/api/syncUser";
import { useUserStore } from "~/zustand/userStore";
import { riderStore } from "~/zustand/riderStore";
import { driverStore } from "~/zustand/driverStore";
import { getModels } from "~/api/vehicle";

export const updateAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("onboarding-type");
  const status = formData.get("status");
  const setRider = riderStore.getState().setRider;
  const setDriver = driverStore.getState().setDriver;
  const id = useUserStore.getState().user?.id;
  if (!type || !status || !id) return;
  switch (type) {
    case "rider":
      const riderProfile = formData.get("rider")?.toString();
      if (!riderProfile) return;
      const rider = await updateRiderOnboarding(id, riderProfile);
      if (!rider || !rider.data) return;
      setRider(rider.data);
      return rider;
    case "driver":
      //You probabluy need to verify the type in the api sync user file (Im tired rn)
      const driverProfile = formData.get("driver")?.toString();
      if (!driverProfile) return;
      const driver = await updateDriverOnboarding(id, driverProfile);
      if (!driver || !driver.data) return;
      setDriver(driver.data);
      return driver;
  }
};

export const checkOnboardingAction = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("type");
  const id = useUserStore.getState().user?.id;
  const setRider = riderStore.getState().setRider;
  const setDriver = driverStore.getState().setDriver;
  if (!type || !id) return;
  switch (type) {
    case "rider":
      const rider = await checkRiderOnboarding(id);
      if (rider.data) {
        setRider(rider.data);
        return { rider, role: "rider" };
      }
      return { error: rider.error, role: "rider" };
    case "driver":
      const driver = await checkDriverOnboarding(id);
      if (driver.data) {
        setDriver(driver.data);
        return { driver, role: "driver" };
      }
      return { error: driver.error, role: "driver" };
  }
};

export const vehicleModelsAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const makeName = formData.get("make")?.toString();
  if (!makeName) return;
  const result = await getModels(makeName);
  return result.data;
};
