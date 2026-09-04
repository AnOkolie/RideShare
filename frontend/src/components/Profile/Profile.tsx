import { Stepper, Group, Divider, Button, Stack, Flex } from "@mantine/core";
import { ProfileHero } from "./ProfileHero";
import { PersonalInfo } from "./PersonalInfo";
import { useState } from "react";
import { useUserStore } from "~/zustand/userStore";
import { RiderInfo } from "./Rider/RiderInfo";
import { useRiderProfile } from "~/hooks/useRiderProfile";
import { Form, useSubmit } from "react-router-dom";
import type { riderStructure } from "~/types/riderProfile";
import { VehicleInfo } from "./Driver/VehicleInfo";
export const Profile = () => {
  const role = useUserStore((s) => s.role);
  const {
    form,
    disableBtn,
    changedAddress,
    getHomeDetails,
    updatePersonalInfo,
    updateProfile,
    updateRiderInfo,
  } = useRiderProfile();
  const profileOptions = [
    {
      element: <ProfileHero handleFieldChange={updateProfile} />,
      description: "Profile",
    },
    {
      element: <PersonalInfo handleFieldChange={updatePersonalInfo} />,
      description: "Personal Info",
    },
  ];
  const riderOptions = [
    {
      element: <RiderInfo handleFieldChange={updateRiderInfo} />,
      description: "Rider Information",
    },
  ];
  const driverOptions = [
    {
      element: <VehicleInfo />,
      description: "Vehicle",
    },
    {
      element: <PersonalInfo handleFieldChange={updatePersonalInfo} />,
      description: "Documents",
    },
  ];
  const pages =
    role === "driver"
      ? [...profileOptions, ...driverOptions]
      : role === "rider"
        ? [...profileOptions, ...riderOptions]
        : [...profileOptions];

  const [pageNum, setPageNum] = useState(0);
  const submit = useSubmit();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting");
    if (changedAddress) {
      await getHomeDetails();
    }
    const formData = new FormData();
    formData.append("profile", JSON.stringify(mapForm(form)));
    submit(formData, {
      method: "PATCH",
      action: "/profile",
    });
  };
  const mapForm = (form: riderStructure) => {
    return {
      firstName: form.personalInfo.firstName,
      lastName: form.personalInfo.lastName,
      email: form.personalInfo.email,
      phoneNumber: form.personalInfo.phoneNumber,
      displayName: form.personalInfo.displayName,
      profilePic: form.profile.profilePic ?? "",
      homeAddress: form.riderInfo.homeAddress,
      homePlaceId: form.riderInfo.homePlaceId,
      homeLatitude: form.riderInfo.homeLatitude,
      homeLongitude: form.riderInfo.homeLongitude,
    };
  };

  return (
    <Group wrap="nowrap" gap={"xl"}>
      <Stepper
        active={pageNum}
        size="sm"
        iconSize={36}
        orientation="vertical"
        onStepClick={setPageNum}
      >
        {pages.map((entry) => (
          <Stepper.Step description={entry.description} />
        ))}
      </Stepper>
      <Divider
        orientation="vertical"
        size={"md"}
        style={{ minHeight: "90vh" }}
      />
      <Stack>
        {pages[pageNum].element}
        <Flex justify={"flex-end"}>
          <Form method="PATCH" onSubmit={handleSubmit}>
            <Button disabled={disableBtn} type="submit">
              Save Changes
            </Button>
          </Form>
        </Flex>
      </Stack>
    </Group>
  );
};
