import { Group, Text, TextInput, Stack } from "@mantine/core";
import type { EmergencyProps } from "~/types/Onboarding/Rider";
import { PhoneInput } from "../Utilities/PhoneInput";
import classes from "../Onboarding.module.css";
export const EmergencyContact = ({
  form,
  updateEmergencyContact,
}: EmergencyProps) => {
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>Optional, but recommended. We will only use this contact in an emergency.</Text>
      <Group grow wrap="nowrap">
        <TextInput
          label="First Name"
          value={form.emergencyContact.firstName}
          onChange={(e) => updateEmergencyContact("firstName", e.target.value)}
        />
        <TextInput
          label="Last Name"
          value={form.emergencyContact.lastName}
          onChange={(e) => updateEmergencyContact("lastName", e.target.value)}
        />
      </Group>
      <PhoneInput
        label="Phone"
        initialCountryCode="CA"
        value={form.emergencyContact.phoneNumber}
        onChange={(e) => updateEmergencyContact("phoneNumber", e ?? "")}
      />
    </Stack>
  );
};
