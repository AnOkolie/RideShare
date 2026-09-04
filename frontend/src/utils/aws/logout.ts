import { signOut } from "aws-amplify/auth";

export async function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("rider-profile");
  localStorage.removeItem("driver-profile");
  localStorage.removeItem("auth-store");
  await signOut();
  window.location.href = "/";
}
