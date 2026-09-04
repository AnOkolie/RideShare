import { getPresignedUrl, s3UploadFile } from "~/api/upload";

export const s3Upload = async (
  file: File,
  uploadType: string,
  role: string,
) => {
  const urlBody = {
    fileName: file.name,
    contentType: file.type,
    uploadType,
    role,
  };
  const presigned = await getPresignedUrl(JSON.stringify(urlBody));
  console.log("presigned: ", presigned);
  if (!presigned || !presigned.data) return;
  const { uploadUrl, key } = presigned.data;

  const uploadResponse = await s3UploadFile(uploadUrl, file);

  if (!uploadResponse.ok) {
    throw new Error(`Upload failed for ${file.name}: ${uploadResponse.status}`);
  }

  return key;
};
