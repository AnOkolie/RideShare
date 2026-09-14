import { TextInput, Group, Stack, Text } from "@mantine/core";
import { PhoneInput } from "../Utilities/PhoneInput";
import type { UserProps } from "~/types/Onboarding/Rider";
import { AvatarElement } from "../Utilities/AvatarElement";
import classes from "../Onboarding.module.css";
export const UserInfo = ({ form, updateUser, updateAvatar }: UserProps) => {
  return (
    <>
      <Stack className={classes.fieldStack}>
        <Text className={classes.fieldHint}>Use a name and photo that drivers can recognize at pickup.</Text>
      <Group className={classes.avatarRow} align="flex-start" wrap="nowrap">
        <AvatarElement
          image={form.rider.profilePicture}
          updateAvatar={updateAvatar}
        />
        <Stack flex={1} gap="sm">
          <TextInput
            label="Public Name"
            placeholder="Enter your public name"
            required
            value={form.rider.publicName}
            onChange={(e) => updateUser("publicName", e.target.value)}
          />
          <PhoneInput
            label="Phone"
            initialCountryCode="CA"
            required
            value={form.rider.phone}
            onChange={(e) => updateUser("phone", e ?? "")}
          />
        </Stack>
      </Group>
      </Stack>
    </>
  );
};
