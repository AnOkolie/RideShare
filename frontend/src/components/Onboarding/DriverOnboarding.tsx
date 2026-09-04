import {
  Paper,
  Box,
  Button,
  Group,
  Stepper,
  Divider,
  Transition,
  Text,
  Card,
  Stack,
} from "@mantine/core";
import { BackgroundCheck } from "./DriverOnboarding/BackgroundCheck";
import { HomeAddress } from "./DriverOnboarding/HomeAddress";
import { PersonalInfo } from "./DriverOnboarding/PersonalInfo";
import { ProfilePhoto } from "./DriverOnboarding/ProfilePhoto";
import { VehicleInfo } from "./DriverOnboarding/VehicleInfo";
import { VehicleInsurance } from "./DriverOnboarding/VehicleInsurance";
import { WelcomePage } from "./DriverOnboarding/WelcomePage";
import { useDriverOnboarding } from "~/hooks/useDriverOnboarding";
import { ExpiryUpload } from "./DriverOnboarding/DriverLicense/LicenseExpiry";
import { LicenseNumber } from "./DriverOnboarding/DriverLicense/LicenseNumber";
import { LicenseBack } from "./DriverOnboarding/DriverLicense/LicenseBack";
import { LicenseFront } from "./DriverOnboarding/DriverLicense/LicenseFront";
import type { PagesStructure } from "~/types/Onboarding/Driver";
export const DriverOnboarding = () => {
  const {
    form,
    pageNumber,
    handleNext,
    handlePrev,
    updateAddress,
    updateDriver,
    updateProfilePhoto,
    updateInsurance,
    updateBackground,
    updateVehicle,
    updateLicense,
    isPageInvalid,
  } = useDriverOnboarding();
  const pages: PagesStructure = [
    {
      section: 0,
      optional: false,
      requiredValues: () => [
        form.driver.name,
        form.driver.DoB,
        form.driver.phone,
      ],
      element: <PersonalInfo form={form} updateDriver={updateDriver} />,
    },

    {
      section: 1,
      optional: true,
      requiredValues: () => [form.address.address],
      element: <HomeAddress form={form} updateAddress={updateAddress} />,
    },

    {
      section: 2,
      optional: false,
      requiredValues: () => [form.license.front],
      element: <LicenseFront updateLicense={updateLicense} form={form} />,
    },

    {
      section: 2,
      optional: false,
      requiredValues: () => [form.license.back],
      element: <LicenseBack updateLicense={updateLicense} form={form} />,
    },

    {
      section: 2,
      optional: false,
      requiredValues: () => [form.license.expiry],
      element: <ExpiryUpload updateLicense={updateLicense} form={form} />,
    },

    {
      section: 2,
      optional: false,
      requiredValues: () => [form.license.number],
      element: <LicenseNumber updateLicense={updateLicense} form={form} />,
    },

    {
      section: 3,
      optional: false,
      requiredValues: () => [
        form.vehicle.make,
        form.vehicle.model,
        form.vehicle.year,
        form.vehicle.colour,
        form.vehicle.licensePlate,
        form.vehicle.seats,
      ],
      element: <VehicleInfo form={form} updateVehicle={updateVehicle} />,
    },

    {
      section: 4,
      optional: false,
      requiredValues: () => [
        form.insurance.insurance,
        form.insurance.expiration,
      ],
      element: (
        <VehicleInsurance form={form} updateInsurance={updateInsurance} />
      ),
    },

    {
      section: 5,
      optional: true,
      requiredValues: () => [form.profile.profilePicture],
      element: (
        <ProfilePhoto form={form} updateProfilePhoto={updateProfilePhoto} />
      ),
    },

    {
      section: 6,
      optional: false,
      requiredValues: () => [form.background.consent],
      element: (
        <BackgroundCheck form={form} updateBackground={updateBackground} />
      ),
    },
  ];
  const page = pages[pageNumber];

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        withBorder
        radius="lg"
        shadow="sm"
        p="xl"
        maw={700}
        w="100%"
        bg="#e8f5e8"
      >
        <Group wrap="nowrap">
          <Card withBorder radius={"md"} bg="rideshare.1">
            <Stack>
              <Text>Driver Application</Text>
              <Stepper
                active={page.section}
                size="sm"
                iconSize={36}
                p={"md"}
                orientation="vertical"
                styles={{
                  step: { padding: "8px 4px" }, // Compact step padding
                  stepIcon: { width: 32, height: 32 }, // Smaller icons
                }}
              >
                <Stepper.Step description="Personal Info" />
                <Stepper.Step description="Home Address" />
                <Stepper.Step description="Driver License" />
                <Stepper.Step description="Vehicle Information" />
                <Stepper.Step description="Vehicle Insurance" />
                <Stepper.Step description="Profile picture" />
                <Stepper.Step description="Background" />
              </Stepper>
            </Stack>
          </Card>
          <Divider orientation="vertical" />
          <Stack>
            <Transition
              mounted
              transition="fade-left"
              duration={250}
              keepMounted
            >
              {(styles) => (
                <Box key={pageNumber} style={styles} p={"md"}>
                  {pageNumber < 0 ? <WelcomePage /> : pages[pageNumber].element}
                </Box>
              )}
            </Transition>
            <Group justify="space-around">
              <Button onClick={handlePrev}>Back</Button>
              <Button
                onClick={() => handleNext(pageNumber === pages.length - 1)}
                disabled={isPageInvalid(page)}
              >
                {pageNumber < pages.length - 1 ? "Next" : "Finish"}
              </Button>
            </Group>
          </Stack>
        </Group>
      </Paper>
    </Box>
  );
};
