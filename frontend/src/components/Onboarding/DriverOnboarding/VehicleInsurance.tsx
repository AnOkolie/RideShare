import { Title, Stack } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import type { InsuranceProps } from "~/types/Onboarding/Driver";
import { INSURANCE_HEADER_TEXT } from "~/utils/string";

export const VehicleInsurance = ({ form, updateInsurance }: InsuranceProps) => {
  return (
    <Stack>
      <Title>{INSURANCE_HEADER_TEXT}</Title>
      <Dropzone
        onDrop={(files) => updateInsurance("insurance", files[0])}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
      />
      <DatePicker
        value={form.insurance.expiration}
        onChange={(e) => updateInsurance("expiration", e)}
      />
    </Stack>
  );
};
