import { signIn } from "aws-amplify/auth";

export async function handleLogin(email: string, password: string) {
  try {
    const { isSignedIn } = await signIn({ username: email, password });
    if (isSignedIn) {
      // proceed to authenticated app state
      return { success: true };
    }
    return { error: true };
  } catch (err) {
    console.error("Login error:", err);
  }
}
