import { Stack, Title } from "@mantine/core";
import { PROFILE_PHOTO_HEADER_TEXT } from "~/utils/string";
import type { ProfilePhotoProps } from "~/types/Onboarding/Driver";
import { AvatarElement } from "../Utilities/AvatarElement";
export const ProfilePhoto = ({
  form,
  updateProfilePhoto,
}: ProfilePhotoProps) => {
  return (
    <Stack>
      <Title>{PROFILE_PHOTO_HEADER_TEXT}</Title>
      <AvatarElement
        image={form.profile.profilePicture}
        updateAvatar={updateProfilePhoto}
      />
    </Stack>
  );
};
