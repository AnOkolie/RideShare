import { useEffect, useRef, useState } from "react";
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

    updateLicense("front", file);

    // setStatus("selected");
    status.current = "selected";
  };

  useEffect(() => {
    console.log("file submission: ", form.license.front);
  }, []);
  return (
    <FileDropzone
      handleDrop={handleDrop}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      status={status}
      title={LICENSE_FRONT_TEXT}
    />
  );
};
