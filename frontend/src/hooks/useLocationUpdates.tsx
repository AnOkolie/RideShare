import { useState } from "react";
import { useSubscription } from "react-stomp-hooks";
import { useUserStore } from "~/zustand/userStore";

export const useLocationUpdates = () => {
  const role = useUserStore((state) => state.role);
  const [arrivedBtn, setArrivedBtn] = useState(false);

  const destination =
    role === "driver" ? "/user/queue/driver/eligible" : "/user/queue/rider/eta";

  useSubscription(destination, (message) => {
    const body = JSON.parse(message.body);
    console.log(body.status);
    if (role === "driver" && body.status === "ARRIVED") {
      setArrivedBtn(true);
    }
  });

  return { arrivedBtn };
};
