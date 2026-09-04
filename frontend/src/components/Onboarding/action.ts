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
  console.log("Onboarding action");
  const type = formData.get("onboarding-type");
  const status = formData.get("status");
  const setRider = riderStore.getState().setRider;
  const setDriver = driverStore.getState().setDriver;
  console.log(type);
  const id = useUserStore.getState().user?.id;
  if (!type || !status || !id) return;
  switch (type) {
    case "rider":
      const rider = await updateRiderOnboarding(id, true);
      console.log("rider");
      setRider(rider);
      return rider;
    case "driver":
      const driverProfile = formData.get("driver")?.toString();
      if (!driverProfile) return;
      console.log("driver profile: ", driverProfile);
      const driver = await updateDriverOnboarding(id, driverProfile);
      console.log(driver);
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
  console.log("onboarding");
  const formData = await request.formData();
  const makeName = formData.get("make")?.toString();
  if (!makeName) return;
  const result = await getModels(makeName);
  console.log("make: ", result);
  return result.data;
};
