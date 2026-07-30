import { Card, Group, TextInput } from "@mantine/core";
import type { EmergencyProps } from "~/types/Onboarding";
import { PhoneInput } from "./PhoneInput";
export const EmergencyContact = ({
  form,
  updateEmergencyContact,
}: EmergencyProps) => {
  return (
    <>
      <Card withBorder radius="lg" p="lg">
        <Group grow>
          <TextInput
            label="First Name"
            value={form.emergencyContact.firstName}
            onChange={(e) =>
              updateEmergencyContact("firstName", e.target.value)
            }
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
      </Card>
    </>
  );
};
