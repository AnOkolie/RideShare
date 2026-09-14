import { Stack, TextInput, Text } from "@mantine/core";
import { PhoneInput } from "../Utilities/PhoneInput";
import { DatePickerInput } from "@mantine/dates";
import type { DriverProps } from "~/types/Onboarding/Driver";
import { todaysDate } from "~/utils/date";
import classes from "../Onboarding.module.css";

export const PersonalInfo = ({ form, updateDriver }: DriverProps) => {
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>Make sure these details match your government-issued licence.</Text>
      <TextInput
        label="Full legal name"
        placeholder="Name"
        size="md"
        radius="md"
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
        size="md"
        radius="md"
        value={form.driver.DoB}
        onChange={(e) => updateDriver("DoB", e ?? "")}
      />
    </Stack>
  );
};
