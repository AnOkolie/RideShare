import { useRef, useState } from "react";
import { FileDropzone } from "~/components/Shared/FileDropzone";
import { type state } from "~/types/dropzone";
import type { onboardingValues } from "~/types/Onboarding/Driver";
import { LICENSE_FRONT_TEXT } from "~/utils/string";

type UploadProps = {
  updateLicense: (
    key: "number" | "front" | "back" | "expiry",
    value: string | File | null,
  ) => void;
  form: onboardingValues;
};

export const LicenseFront = ({ updateLicense, form }: UploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(
    form.license.front,
  );
  // const [status, setStatus] = useState<state>("idle");
  const status = useRef<state>("idle");

  const handleDrop = (files: File[]) => {
    const file = files[0];
    console.log("calling file update: ", file.name);

    setSelectedFile(file);
    updateLicense("front", file);

    // setStatus("selected");
    status.current = "selected";
  };
  return (
    <FileDropzone
      handleDrop={handleDrop}
      selectedFile={selectedFile}
      status={status}
      title={LICENSE_FRONT_TEXT}
    />
  );
};
