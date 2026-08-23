import { signOut } from "aws-amplify/auth";

export async function logout() {
  localStorage.removeItem("accessToken");
  await signOut();
  window.location.href = "/";
}
