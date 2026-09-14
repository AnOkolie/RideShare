import { signUp, confirmSignUp } from "aws-amplify/auth";
import { createUser } from "~/api/syncUser";
import type { newUser } from "~/types/user";
import { useUserStore } from "~/zustand/userStore";
import { displayNotifications } from "../notifications/displayNotification";
import { handleLogin } from "./login";

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
    console.log("signup output: ", output);
    return {
      email,
      firstName,
      lastName,
      password,
      cognitoSub: output.userId,
      emailVerified: false,
    };
  } catch (err) {
    console.error("Sign up error:", err);
    throw err;
  }
}

export async function handleConfirmSignUp(
  email: string,
  code: string,
  user: newUser,
  password: string,
) {
  const setUser = useUserStore.getState().setUser;
  try {
    const res = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    console.log(user);
    user.emailVerified = true;
    const response = await createUser(user);
    console.log("create User: ", response);
    if (response.data) {
      console.log("response data: ", response.data);
      setUser(response.data);
      handleLogin(email, password);
    }
    if (response.error) {
      throw new Error(response.error.message);
    }
    return res;
  } catch (err) {
    console.error("Confirmation error:", err);
    displayNotifications("Signup confirmation Failed", "error", "red");
    throw err;
  }
}
