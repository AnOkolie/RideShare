import type { ActionFunctionArgs } from "react-router-dom";
import { updateRiderProfile } from "~/api/profile";
import { riderStore } from "~/zustand/riderStore";
import { useUserStore } from "~/zustand/userStore";

export const profileAction = async ({ request }: ActionFunctionArgs) => {
  const role = useUserStore.getState().role;
  const id = useUserStore.getState().user?.id;
  const form = await request.formData();
  const profile = form.get("profile");
  const setRider = riderStore.getState().setRider;
  const setUser = useUserStore.getState().setUser;
  if (!role || !form || !id || !profile) return;
  switch (role) {
    case "driver":
      //   await updateDriverProfile(id);
      break;
    case "rider":
      const response = await updateRiderProfile(id, profile.toString());
      if (response.error || !response.data) return;
      setRider(response.data.riderProfile);
      setUser(response.data.userProfile);
      break;
  }
};
