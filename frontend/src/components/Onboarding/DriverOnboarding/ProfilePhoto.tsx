import { Stack, Text } from "@mantine/core";
import type { ProfilePhotoProps } from "~/types/Onboarding/Driver";
import { AvatarElement } from "../Utilities/AvatarElement";
import classes from "../Onboarding.module.css";
export const ProfilePhoto = ({
  form,
  updateProfilePhoto,
}: ProfilePhotoProps) => {
  return (
    <Stack className={classes.fieldStack}>
      <Text className={classes.fieldHint}>Use a recent, well-lit photo of your face. Riders see this when you accept their request.</Text>
      <AvatarElement
        image={form.profile.profilePicture}
        updateAvatar={updateProfilePhoto}
      />
    </Stack>
  );
};
