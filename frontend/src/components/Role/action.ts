import { type ActionFunctionArgs } from "react-router-dom";
import { useUserStore } from "~/zustand/userStore";
import { checkDriverOnboarding, checkRiderOnboarding } from "~/api/syncUser";
import { riderStore } from "~/zustand/riderStore";
import { driverStore } from "~/zustand/driverStore";
export const changeRoleAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const type = formData.get("role");
  const setRider = riderStore.getState().setRider;
  const setDriver = driverStore.getState().setDriver;
  const id = useUserStore.getState().user?.id;
  if (!type || !id) return;
  switch (type) {
    case "rider":
      const rider = await checkRiderOnboarding(id);
      if (rider.data) {
        setRider(rider.data);
        return { data: rider, role: "rider" };
      } else {
        return { error: rider.error, role: "rider" };
      }
    // console.log(rider);
    case "driver":
      const driver = await checkDriverOnboarding(id);
      if (driver.data) {
        setDriver(driver.data);
        return { data: driver.error, role: "driver" };
      } else {
        return { error: driver.error, role: "driver" };
      }
  }
};
