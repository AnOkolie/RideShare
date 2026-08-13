import { signIn } from "aws-amplify/auth";
import { getAccessToken } from "./token";
import { getUser } from "~/api/syncUser";
import { useUserStore } from "~/zustand/userStore";
import { displayNotifications } from "~/utils/notifications/displayNotification";

export async function handleLogin(email: string, password: string) {
  try {
    const output = await signIn({ username: email, password });
    if (output.isSignedIn) {
      const token = await getAccessToken();
      if (token) {
        localStorage.setItem("accessToken", token);
        useUserStore.getState().setToken(token);
      }
      const user = await getUser();
      const setUser = useUserStore.getState().setUser;
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
      // proceed to authenticated app state
      return { success: true };
    }
    return { error: true };
  } catch (err) {
    console.error("Login error:", err);
  }
}
