import { Group, Stack, Text, TextInput, Title } from "@mantine/core";
import type { riderStructure } from "~/types/riderProfile";
import { useUserStore } from "~/zustand/userStore";
type props = {
  handleFieldChange: (
    key: keyof riderStructure["personalInfo"],
    value: string,
  ) => void;
};
export const PersonalInfo = ({ handleFieldChange }: props) => {
  const userProfile = useUserStore((s) => s.user);
  return (
    <Stack>
      <Title>Personal Information</Title>
      <TextInput
        defaultValue={userProfile?.firstName}
        label="First Name"
        onChange={(e) => handleFieldChange("firstName", e.target.value)}
      />
      <TextInput
        defaultValue={userProfile?.lastName}
        label="Last Name"
        onChange={(e) => handleFieldChange("lastName", e.target.value)}
      />
      <Group wrap="nowrap">
        <TextInput
          disabled
          defaultValue={userProfile?.email}
          size="md"
          label="email"
        />
        <Text>{userProfile?.emailVerified ? "Verified" : "Take Action"}</Text>
      </Group>
      <label>Phone Number</label>
      <Text>{userProfile?.phoneNumber}</Text>
    </Stack>
  );
};
