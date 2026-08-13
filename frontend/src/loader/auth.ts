import { getUser } from "~/api/syncUser";
import { displayNotifications } from "~/utils/notifications/displayNotification";
import { useUserStore } from "~/zustand/userStore";

export const authAction = async () => {
  const user = await getUser();
  const { setUser } = useUserStore();
  console.log("user:", user);
  if (user.error) {
    displayNotifications(
      "Login Failure",
      "Failed to login, verify your credentials",
      "Red",
    );
    return;
  }
  if (user.data) {
    setUser(user.data ?? null);
  }
  return user;
};
