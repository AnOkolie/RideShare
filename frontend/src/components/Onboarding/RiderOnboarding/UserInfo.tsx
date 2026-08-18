import { Card, TextInput, Group, Stack } from "@mantine/core";
import { PhoneInput } from "../Utilities/PhoneInput";
import type { UserProps } from "~/types/Onboarding/Rider";
import { AvatarElement } from "../Utilities/AvatarElement";
export const UserInfo = ({ form, updateUser, updateAvatar }: UserProps) => {
  return (
    <>
      <Group>
        <AvatarElement
          image={form.rider.profilePicture}
          updateAvatar={updateAvatar}
        />
        <Stack>
          <TextInput
            label="Public Name"
            placeholder="Enter your public name"
            required
            value={form.rider.publicName}
            onChange={(e) => updateUser("publicName", e.target.value)}
          ></TextInput>
          <PhoneInput
            label="Phone"
            initialCountryCode="CA"
            required
            value={form.rider.phone}
            onChange={(e) => updateUser("phone", e ?? "")}
          />
        </Stack>
      </Group>
    </>
  );
};
