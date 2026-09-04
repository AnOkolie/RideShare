import { Stack, Title, TextInput, Text, rem } from "@mantine/core";
import { LICENSE_FRONT_TEXT, LICENSE_HEADER_TEXT } from "~/utils/string";
import {
  Dropzone,
  type DropzoneProps,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { DateInput } from "@mantine/dates";
import type { LicenseProps } from "~/types/Onboarding/Driver";
import { todaysDate } from "~/utils/date";
import { IconPhoto } from "@tabler/icons-react";
import { UploadSimpleIcon, XIcon } from "@phosphor-icons/react";
export const DriverLicense = ({ updateLicense, pageNum }: LicenseProps) => {
  const pages = [
    {
      element: <FrontUpload updateLicense={updateLicense} />,
    },
    {
      element: <BackUpload updateLicense={updateLicense} />,
    },
    {
      element: <ExpiryUpload />,
    },
    {
      element: <LicenseNumber />,
    },
  ];
  return (
    <Stack>
      <Title>{LICENSE_HEADER_TEXT}</Title>
      {pages[pageNum].element}
    </Stack>
  );
};

type UploadProps = {
  updateLicense: (
    key: "number" | "front" | "back" | "expiry",
    value: string | File | null,
  ) => void;
} & Partial<DropzoneProps>;

const FrontUpload = ({ updateLicense, ...props }: UploadProps) => {
  return (
    <Stack>
      <Title>{LICENSE_FRONT_TEXT}</Title>
      <Dropzone
        onDrop={(files) => {
          updateLicense("front", files[0]);
          console.log("upload success");
        }}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Dropzone.Accept>
          <UploadSimpleIcon size={52} color="var(--mantine-color-blue-6)" />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <XIcon size={52} color="var(--mantine-color-red-6)" />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
          <Text c="dimmed">Drag images here or click to select files</Text>
        </Dropzone.Idle>
      </Dropzone>
    </Stack>
  );
};

const BackUpload = ({ updateLicense, ...props }: UploadProps) => {
  return (
    <Stack>
      <Title>Behind</Title>
      <Dropzone
        onDrop={(files) => updateLicense("front", files[0])}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Dropzone.Accept>
          <UploadSimpleIcon size={52} color="var(--mantine-color-blue-6)" />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <XIcon size={52} color="var(--mantine-color-red-6)" />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
          <Text c="dimmed">Drag images here or click to select files</Text>
        </Dropzone.Idle>
      </Dropzone>
    </Stack>
  );
};

const ExpiryUpload = () => {
  return (
    <Stack>
      <Text>Expiry date</Text>
      <DateInput defaultValue={todaysDate()} />
    </Stack>
  );
};

const LicenseNumber = () => {
  return (
    <Stack>
      <Text>License Number</Text>
      <TextInput />
    </Stack>
  );
};
