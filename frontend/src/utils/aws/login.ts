import { signIn, AuthError } from "aws-amplify/auth";
import { getAccessToken } from "./token";
import { getUser } from "~/api/syncUser";
import { useUserStore } from "~/zustand/userStore";

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
        return { error: true };
      }
      if (user.data) {
        setUser(user.data ?? null);
      }
      // proceed to authenticated app state
      return { success: true };
    }
    return { error: true };
  } catch (err) {
    if (
      err instanceof AuthError &&
      err.name === "UserAlreadyAuthenticatedException"
    ) {
      console.log(
        "User is already signed in. Redirecting to home...",
        err.recoverySuggestion,
      );

      // OPTION A: Redirect them straight to the main app dashboard
      window.location.href = "/onboarding";
    }
  }
}
