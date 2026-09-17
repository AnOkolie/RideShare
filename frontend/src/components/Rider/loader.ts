import { getRiderActiveTrips } from "~/api/trips";
import { useUserStore } from "~/zustand/userStore";

export const riderLoader = async () => {
  const role = useUserStore.getState().role;
  if (!role) return;
  if (role === "rider") {
    const result = await getRiderActiveTrips();
    console.log("rider active trips: ", result);
    return result;
  }
  return { error: true };
};
