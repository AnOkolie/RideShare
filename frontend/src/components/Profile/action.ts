import type { ActionFunctionArgs } from "react-router-dom";
import { updateDriverProfile, updateRiderProfile } from "~/api/profile";
import type { riderStructure } from "~/types/riderProfile";
import { useUserStore } from "~/zustand/userStore";

export const profileAction = async ({ request }: ActionFunctionArgs) => {
  const role = useUserStore.getState().role;
  const id = useUserStore.getState().user?.id;
  const form = await request.formData();
  const profile = form.get("profile");
  console.log("profile ", profile);
  if (!role || !form || !id || !profile) return;
  switch (role) {
    case "driver":
      //   await updateDriverProfile(id);
      break;
    case "rider":
      await updateRiderProfile(id, profile.toString());
      break;
  }
};
