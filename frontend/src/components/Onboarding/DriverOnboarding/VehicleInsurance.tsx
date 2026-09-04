import { Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import type { InsuranceProps } from "~/types/Onboarding/Driver";
import { FileDropzone } from "~/components/Shared/FileDropzone";
import { useRef, useState } from "react";
import { type state } from "~/types/dropzone";
export const VehicleInsurance = ({ form, updateInsurance }: InsuranceProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [status, setStatus] = useState<state>("idle");
  const status = useRef<state>("idle");
  const handleDrop = (files: File[]) => {
    const file = files[0];
    console.log("calling file update: ", file.name);
    updateInsurance("insurance", file);

    // setStatus("selected");
    status.current = "selected";
  };
  return (
    <Stack>
      <FileDropzone
        handleDrop={handleDrop}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        status={status}
        title="Insuurance"
      />
      <DatePickerInput
        value={form.insurance.expiration}
        onChange={(e) => updateInsurance("expiration", e)}
      />
    </Stack>
  );
};
