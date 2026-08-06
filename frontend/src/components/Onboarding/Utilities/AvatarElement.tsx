import { Avatar, Box, FileButton, Overlay, Tooltip } from "@mantine/core";
import type { onboardingValues } from "~/types/Onboarding/Rider";

type AvatarProps = {
  image: File | null;
  updateAvatar: (key: "profilePicture", value: File | null) => void;
};
export const AvatarElement = ({ image, updateAvatar }: AvatarProps) => {
  // Create a preview URL for the selected file
  const imageUrl = image ? URL.createObjectURL(image) : null;

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
