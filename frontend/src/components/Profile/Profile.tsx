import {
  Box,
  Button,
  Card,
  Group,
  Stack,
  Stepper,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCheck, IconSettings } from "@tabler/icons-react";
import { Form, useSubmit } from "react-router-dom";
import { useState } from "react";
import { VehicleInfo } from "./Driver/VehicleInfo";
import { PersonalInfo } from "./PersonalInfo";
import { ProfileHero } from "./ProfileHero";
import { RiderInfo } from "./Rider/RiderInfo";
import { useRiderProfile } from "~/hooks/useRiderProfile";
import type { riderStructure } from "~/types/riderProfile";
import { useUserStore } from "~/zustand/userStore";
import classes from "./Profile.module.css";

export const Profile = () => {
  const role = useUserStore((state) => state.role);
  const {
    form,
    disableBtn,
    changedAddress,
    getHomeDetails,
    updatePersonalInfo,
    updateRiderInfo,
  } = useRiderProfile();
  const submit = useSubmit();
  const [pageNum, setPageNum] = useState(0);

  const profileOptions = [
    { element: <ProfileHero />, label: "Profile overview" },
    { element: <PersonalInfo handleFieldChange={updatePersonalInfo} />, label: "Personal information" },
  ];
  const riderOptions = [
    { element: <RiderInfo handleFieldChange={updateRiderInfo} />, label: "Rider information" },
  ];
  const driverOptions = [
    { element: <VehicleInfo />, label: "Vehicle" },
    { element: <PersonalInfo handleFieldChange={updatePersonalInfo} />, label: "Documents" },
  ];
  const pages =
    role === "driver"
      ? [...profileOptions, ...driverOptions]
      : role === "rider"
        ? [...profileOptions, ...riderOptions]
        : profileOptions;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (changedAddress) {
      await getHomeDetails();
    }

    const formData = new FormData();
    formData.append("profile", JSON.stringify(mapForm(form)));
    submit(formData, { method: "PATCH", action: "/profile" });
  };

  return (
    <Box className={classes.page}>
      <Box className={classes.pageHeading}>
        <Title order={1}>Profile settings</Title>
        <Text c="dimmed">
          Keep your account details current and manage your ride preferences.
        </Text>
      </Box>

      <Box className={classes.settingsLayout}>
        <Card className={classes.settingsNav} padding="lg" radius="md" withBorder>
          <Group gap="sm" mb="xl" wrap="nowrap">
            <ThemeIcon color="rideshare" radius="md" size="lg" variant="light">
              <IconSettings size={20} />
            </ThemeIcon>
            <Box>
              <Text fw={700} size="sm">Account settings</Text>
              <Text c="dimmed" size="xs">Manage your profile</Text>
            </Box>
          </Group>

          <Stepper
            active={pageNum}
            className={classes.stepper}
            iconSize={30}
            onStepClick={setPageNum}
            orientation="vertical"
            size="sm"
          >
            {pages.map((page) => (
              <Stepper.Step key={page.label} label={page.label} />
            ))}
          </Stepper>
        </Card>

        <Stack className={classes.contentColumn} gap="md">
          <Card className={classes.contentCard} padding="xl" radius="md" withBorder>
            {pages[pageNum].element}
          </Card>

          <Group className={classes.saveBar} justify="space-between" wrap="nowrap">
            <Group gap={7} wrap="nowrap">
              <ThemeIcon color="green" radius="xl" size="sm" variant="light">
                <IconCheck size={14} />
              </ThemeIcon>
              <Text c="dimmed" size="sm">Changes are saved when you select Save changes.</Text>
            </Group>
            <Form method="PATCH" onSubmit={handleSubmit}>
              <Button disabled={disableBtn} type="submit">
                Save changes
              </Button>
            </Form>
          </Group>
        </Stack>
      </Box>
    </Box>
  );
};

const mapForm = (form: riderStructure) => ({
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
});
