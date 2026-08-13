import { signUp, confirmSignUp } from "aws-amplify/auth";
import { getUser } from "~/api/syncUser";

export async function handleSignUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  try {
    const output = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: { email, given_name: firstName, family_name: lastName },
      },
    });
    console.log(output);
    // useUserStore.getState().setToken(token);
    getUser();
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
