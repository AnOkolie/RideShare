import { Button, Stack, Title, Group, TextInput } from "@mantine/core";
import { LICENSE_FRONT_TEXT, LICENSE_HEADER_TEXT } from "~/utils/string";
import {
  Dropzone,
  type DropzoneProps,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import type { LicenseProps } from "~/types/Onboarding/Driver";

export const DriverLicense = ({ updateLicense }: LicenseProps) => {
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

  const [pageNum, setPageNum] = useState(0);
  const handlePrev = () => {
    setPageNum(pageNum - 1);
  };

  const handleNext = () => {
    if (pageNum < pages.length) {
      setPageNum(pageNum + 1);
    }
  };
  return (
    <Stack>
      <Title>{LICENSE_HEADER_TEXT}</Title>
      {pages[pageNum].element}
      <Group justify="space-between">
        <Button disabled={pageNum < 1} onClick={handlePrev}>
          Back
        </Button>
        <Button onClick={handleNext}>
          {pageNum < pages.length - 1 ? "Next" : "Finish"}
        </Button>
      </Group>
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
        onDrop={(files) => updateLicense("front", files[0])}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      />
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
      />
    </Stack>
  );
};

const ExpiryUpload = () => {
  return <DateInput />;
};

const LicenseNumber = () => {
  return <TextInput />;
};
