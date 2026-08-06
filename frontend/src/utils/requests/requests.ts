import type { RequestMethods, RequestResolve } from "~/types/request";
import { getAccessToken } from "../aws/token";

export const requests = async <Type>(
  method: RequestMethods,
  path: string,
  headers: Record<string, string>,
  body: string,
): Promise<RequestResolve<Type>> => {
  try {
    const requestHeaders = new Headers();
    const token = getAccessToken();
    if (token) {
      requestHeaders.append("Authorization", `Bearer${token}`);
    }
    for (const [key, value] of Object.entries(headers)) {
      requestHeaders.append(key, value);
    }
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/${path}`, {
      method,
      headers,
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
