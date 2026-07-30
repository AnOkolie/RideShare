import { getCurrentUser } from "aws-amplify/auth";

export async function checkLoggedIn() {
  try {
    const user = await getCurrentUser();
    return user; // logged in
  } catch {
    return null; // not logged in
  }
}
