import { getDriverActiveTrips } from "~/api/trips";
import { useUserStore } from "~/zustand/userStore";

export const driverLoader = async () => {
  const role = useUserStore.getState().role;
  if (!role) return;
  if (role === "driver") {
    const result = await getDriverActiveTrips();
    console.log("driver active trips: ", result);
    return result;
  }
  return { error: true };
};
