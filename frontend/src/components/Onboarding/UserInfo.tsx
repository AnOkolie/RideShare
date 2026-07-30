import {
  Avatar,
  Box,
  Card,
  TextInput,
  Group,
  Stack,
  FileButton,
  Overlay,
  Tooltip,
} from "@mantine/core";
import { PhoneInput } from "./PhoneInput";
import type { onboardingValues, UserProps } from "~/types/Onboarding";

export const UserInfo = ({ form, updateUser, updateAvatar }: UserProps) => {
  return (
    <>
      <Card withBorder radius="lg" p="lg">
        <Group>
          <AvatarElement form={form} updateAvatar={updateAvatar} />
          <Stack>
            <TextInput
              label="Public Name"
              placeholder="Enter your public name"
              required
              value={form.user.publicName}
              onChange={(e) => updateUser("publicName", e.target.value)}
            ></TextInput>
            <PhoneInput
              label="Phone"
              initialCountryCode="CA"
              required
              value={form.user.phone}
              onChange={(e) => updateUser("phone", e ?? "")}
            />
          </Stack>
        </Group>
      </Card>
    </>
  );
};
type AvatarProps = {
  form: onboardingValues;
  updateAvatar: (key: "profilePicture", value: File | null) => void;
};
const AvatarElement = ({ form, updateAvatar }: AvatarProps) => {
  // Create a preview URL for the selected file
  const imageUrl = form.user.profilePicture
    ? URL.createObjectURL(form.user.profilePicture)
    : null;

  return (
    <Box
      pos="relative"
      w={120}
      h={120}
      style={{ borderRadius: "50%", overflow: "hidden" }}
    >
      <Avatar src={imageUrl} size={120} radius={120} />

      <FileButton
        onChange={(e) => updateAvatar("profilePicture", e)}
        accept="image/png,image/jpeg"
      >
        {(props) => (
          <Tooltip label="Change photo" withArrow>
            <Overlay
              {...props}
              component="button"
              color="#000"
              backgroundOpacity={0.4}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
              }}
            >
              {/* Optional: Add an upload icon or text here */}
              Upload
            </Overlay>
          </Tooltip>
        )}
      </FileButton>
    </Box>
  );
};
