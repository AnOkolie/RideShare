import type { ActionFunctionArgs } from "react-router-dom";
import {
  checkDriverOnboarding,
  checkRiderOnboarding,
  updateDriverOnboarding,
  updateRiderOnboarding,
} from "~/api/syncUser";
import { useUserStore } from "~/zustand/userStore";

export const onboardingAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("formData", formData);
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
  console.log("formData onboarding check", formData);
  const type = formData.get("type");
  const id = useUserStore.getState().user?.id;
  if (!type || !id) return;
  switch (type) {
    case "rider":
      return checkRiderOnboarding(id);
    case "driver":
      return checkDriverOnboarding(id);
  }
};
