import { fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useUserStore } from "~/zustand/userStore";

export async function getAccessToken() {
  const session = await fetchAuthSession();
  return session.tokens?.accessToken?.toString();
}

export async function callBackendApi() {
  const token = await getAccessToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/some-endpoint`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.json();
}

export function startAuthTokenSync() {
  return Hub.listen("auth", async ({ payload }) => {
    switch (payload.event) {
      case "tokenRefresh":
        await getAccessToken();
        break;

      case "signedOut":
      case "tokenRefresh_failure":
        useUserStore.getState().setToken("");
        localStorage.removeItem("accessToken");
        break;
    }
  });
}
