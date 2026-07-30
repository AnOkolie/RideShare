import { fetchAuthSession } from "aws-amplify/auth";

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
