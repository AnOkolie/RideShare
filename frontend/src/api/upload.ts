import { RequestMethods, type RequestResolve } from "~/types/request";
import type { presignedUrl } from "~/types/upload";
import { request } from "~/utils/requests/requests";

export const getPresignedUrl = async (
  body: string,
): Promise<RequestResolve<presignedUrl>> =>
  await request(RequestMethods.POST, "api/upload/presign", undefined, body);

export const s3UploadFile = async (url: string, file: File) =>
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
