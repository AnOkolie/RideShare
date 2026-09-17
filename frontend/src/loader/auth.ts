import { getUser } from "~/api/syncUser";
import { logout } from "~/utils/aws/logout";
import { useUserStore } from "~/zustand/userStore";

export const authLoader = async () => {
  const user = await getUser();
  const setUser = useUserStore.getState().setUser;
  if (user.error) {
    // displayNotifications(
    //   "Login Failure",
    //   "Failed to login, verify your credentials",
    //   "Red",
    // );
    logout();
    return;
  }
  if (user.data) {
    setUser(user.data ?? null);
  }
  return user;
};
