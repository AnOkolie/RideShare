import { Stack, TextInput, Title, Text } from "@mantine/core";
import { PERSONAL_INFO_TITLE } from "~/utils/string";
import { PhoneInput } from "../Utilities/PhoneInput";
import { DatePicker } from "@mantine/dates";
import type { DriverProps } from "~/types/Onboarding/Driver";

export const PersonalInfo = ({ form, updateDriver }: DriverProps) => {
  return (
    <Stack>
      <Title>{PERSONAL_INFO_TITLE}</Title>
      <TextInput
        placeholder="Name"
        value={form.driver.name}
        onChange={(e) => updateDriver("name", e.target.value ?? "")}
      />
      <PhoneInput onChange={(e) => updateDriver("phone", e ?? "")} />
      <Text defaultValue={form.driver.DoB ?? ""}>
        <DatePicker onChange={(e) => updateDriver("DoB", e ?? "")} />
      </Text>
    </Stack>
  );
};
