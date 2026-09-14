import {
  useEffect,
  type RefObject,
} from "react";
import { Stack, Text, rem, Loader, Group } from "@mantine/core";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  type DropzoneProps,
} from "@mantine/dropzone";
import { IconCheck, IconPhoto } from "@tabler/icons-react";
import { UploadSimpleIcon, XIcon } from "@phosphor-icons/react";
import type { state } from "~/types/dropzone";
import classes from "~/components/Onboarding/Onboarding.module.css";
type props = {
  handleDrop: (files: File[]) => void;
  selectedFile: File | null;
  status: RefObject<state>;
  title: string;
} & Partial<DropzoneProps>;

export const FileDropzone = ({
  handleDrop,
  selectedFile,
  status,
  title,
  ...props
}: props) => {
  useEffect(() => {
    console.log(`${title} sends file: ${selectedFile?.name}`);
  }, []);
  useEffect(() => {
    console.log(`${title} sends status: ${status.current}`);
  }, [status]);
  return (
    <Stack gap="sm">
      <Text fw={700} c="dark.8">{title}</Text>

      <Dropzone
        onDrop={(files) => handleDrop(files)}
        onReject={() => (status.current = "error")}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className={classes.uploadZone}
        {...props}
      >
        <Dropzone.Accept>
          <UploadSimpleIcon size={52} color="var(--mantine-color-blue-6)" />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <XIcon size={52} color="var(--mantine-color-red-6)" />
        </Dropzone.Reject>

        <Dropzone.Idle>
          {status.current === "success" ? (
            <Group justify="center">
              <IconCheck size={52} color="var(--mantine-color-green-6)" />
              <Text>Upload successful</Text>
            </Group>
          ) : (
            <>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />

              <Text c="dimmed">
                Drag an image here or click to select a file
              </Text>
            </>
          )}
        </Dropzone.Idle>
      </Dropzone>

      {status.current === "selected" && selectedFile && (
        <Text size="sm">Selected: {selectedFile.name}</Text>
      )}

      {status.current === "uploading" && (
        <Group>
          <Loader size="sm" />
          <Text size="sm">Uploading...</Text>
        </Group>
      )}

      {status.current === "error" && (
        <Text c="red" size="sm">
          Upload failed. Please try again.
        </Text>
      )}
    </Stack>
  );
};
