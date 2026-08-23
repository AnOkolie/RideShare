import { Stack, TextInput, Title } from "@mantine/core";
import { PERSONAL_INFO_TITLE } from "~/utils/string";
import { PhoneInput } from "../Utilities/PhoneInput";
import { DatePickerInput } from "@mantine/dates";
import type { DriverProps } from "~/types/Onboarding/Driver";
import { todaysDate } from "~/utils/date";

export const PersonalInfo = ({ form, updateDriver }: DriverProps) => {
  return (
    <Stack>
      <Title>{PERSONAL_INFO_TITLE}</Title>
      <TextInput
        placeholder="Name"
        value={form.driver.name}
        onChange={(e) => updateDriver("name", e.target.value ?? "")}
      />
      <PhoneInput
        label="Phone"
        initialCountryCode="CA"
        required
        value={form.driver.phone}
        onChange={(e) => updateDriver("phone", e ?? "")}
      />

      <DatePickerInput
        label="Date of Birth"
        placeholder={todaysDate()}
        defaultValue={new Date(Date.now())}
        value={form.driver.DoB}
        onChange={(e) => updateDriver("DoB", e ?? "")}
      />
    </Stack>
  );
};
