import { signIn } from "aws-amplify/auth";
import { getAccessToken } from "./token";

export async function handleLogin(email: string, password: string) {
  try {
    const output = await signIn({ username: email, password });
    console.log(output);
    if (output.isSignedIn) {
      const token = await getAccessToken();
      if (token) {
        localStorage.setItem("accessToken", token);
      }
      console.log("is signed in");
      // proceed to authenticated app state
      return { success: true };
    }
    return { error: true };
  } catch (err) {
    console.error("Login error:", err);
  }
}
