import { useEffect, useRef, useState } from "react";
import { FileDropzone } from "~/components/Shared/FileDropzone";
import type { state } from "~/types/dropzone";
import type { onboardingValues } from "~/types/Onboarding/Driver";
import { LICENSE_BACK_TEXT } from "~/utils/string";

type UploadProps = {
  updateLicense: (
    key: "number" | "front" | "back" | "expiry",
    value: string | File | null,
  ) => void;
  form: onboardingValues;
};
export const LicenseBack = ({ updateLicense, form }: UploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(
    form.license.back,
  );

  // const [status, setStatus] = useState<state>("idle");
  const status = useRef<state>("idle");

  const handleDrop = (files: File[]) => {
    const file = files[0];
    console.log("calling file update: ", file.name);
    setSelectedFile(file);
    updateLicense("back", file);

    // setStatus("selected");
    status.current = "selected";
  };
  useEffect(() => {
    console.log("file submission: ", form.license.back);
  }, []);
  return (
    <FileDropzone
      handleDrop={handleDrop}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      status={status}
      title={LICENSE_BACK_TEXT}
    />
  );
};
