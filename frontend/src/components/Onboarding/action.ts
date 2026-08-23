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

export const onboardingAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("onboarding-type");
  const status = formData.get("status");
  const id = useUserStore.getState().user?.id;
  if (!type || !status || !id) return;
  switch (type) {
    case "rider":
      updateRiderOnboarding(id, true);
      break;
    case "driver":
      updateDriverOnboarding(id, true);
      break;
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
      }
      return { rider, role: "rider" };
    case "driver":
      const driver = await checkDriverOnboarding(id);
      if (driver.data) {
        setDriver(driver.data);
      }
      return { driver, role: "driver" };
  }
};
