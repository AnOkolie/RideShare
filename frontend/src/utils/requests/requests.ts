import type { RequestMethods, RequestResolve } from "~/types/request";
import { getAccessToken } from "../aws/token";
import { useUserStore } from "~/zustand/userStore";

export const request = async <Type>(
  method: RequestMethods,
  path: string,
  headers?: Record<string, string>,
  body?: string,
): Promise<RequestResolve<Type>> => {
  try {
    const requestHeaders = new Headers();
    const token = await getAccessToken();
    console.log("access token:", token);
    const role = useUserStore.getState().user?.role;
    if (token) {
      requestHeaders.append("Authorization", `Bearer ${token}`);
    }
    if (role) {
      requestHeaders.append("X-Active-Role", `${role}`);
    }
    for (const [key, value] of Object.entries(headers ?? {})) {
      requestHeaders.append(key, value);
    }
    for (const [key, value] of requestHeaders) {
      console.log(`${key} : ${value}`);
    }
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/${path}`, {
      method,
      headers: requestHeaders,
      body,
      credentials: "include",
    });
    if (res.ok) {
      return { data: await res.json() };
    }
    return { error: await res.json() };
  } catch (err) {
    return {
      error: {
        status: 400,
        message: "Internal server error",
      },
    };
  }
};
