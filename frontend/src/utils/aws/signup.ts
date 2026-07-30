import { signUp, confirmSignUp } from "aws-amplify/auth";

export async function handleSignUp(email: string, password: string) {
  try {
    await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: { email },
      },
    });
    // Cognito sends a verification code by email — prompt the user for it next
  } catch (err) {
    console.error("Sign up error:", err);
  }
}

export async function handleConfirmSignUp(email: string, code: string) {
  try {
    await confirmSignUp({ username: email, confirmationCode: code });
    // user is now confirmed, can log in
  } catch (err) {
    console.error("Confirmation error:", err);
  }
}
