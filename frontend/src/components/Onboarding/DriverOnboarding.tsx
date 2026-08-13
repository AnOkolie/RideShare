import {
  Paper,
  Box,
  Button,
  Group,
  Stepper,
  Divider,
  Transition,
  Text,
  Stack,
} from "@mantine/core";
import { BackgroundCheck } from "./DriverOnboarding/BackgroundCheck";
import { DriverLicense } from "./DriverOnboarding/DriverLicense";
import { HomeAddress } from "./DriverOnboarding/HomeAddress";
import { PersonalInfo } from "./DriverOnboarding/PersonalInfo";
import { ProfilePhoto } from "./DriverOnboarding/ProfilePhoto";
import { VehicleInfo } from "./DriverOnboarding/VehicleInfo";
import { VehicleInsurance } from "./DriverOnboarding/VehicleInsurance";
import { WelcomePage } from "./DriverOnboarding/WelcomePage";
import { useState } from "react";
import type { onboardingValues } from "~/types/Onboarding/Driver";
import { useDriverOnboarding } from "~/hooks/useDriverOnboarding";
import type { pagesStructure } from "~/types/Onboarding/Driver";
import { useEffect } from "react";
import { useSubmit } from "react-router-dom";
export const DriverOnboarding = () => {
  const {
    form,
    disableBtn,
    setDisabelBtn,
    updateAddress,
    updateDriver,
    updateProfilePhoto,
    updateInsurance,
    updateBackground,
    updateVehicle,
    updateLicense,
    isCurrentPageValid,
  } = useDriverOnboarding();

  const pages: pagesStructure[] = [
    {
      element: <PersonalInfo form={form} updateDriver={updateDriver} />,
      optional: false,
      key: "driver",
      verificationFunction: (
        key: keyof onboardingValues,
        skip: boolean,
        optionalFields: string[],
      ) => {
        return isCurrentPageValid(key, skip, optionalFields);
      },
      optionalFields: ["profilePicture"],
    },
    {
      element: <HomeAddress form={form} updateAddress={updateAddress} />,
      optional: true,
      key: "address",
      optionalFields: [],
      verificationFunction: (
        key: keyof onboardingValues,
        skip: boolean,
        optionalFields: string[],
      ) => {
        return isCurrentPageValid(key, skip, optionalFields);
      },
    },
    {
      element: <DriverLicense form={form} updateLicense={updateLicense} />,
      optional: false,
      key: "license",
      optionalFields: [],
      verificationFunction: (
        key: keyof onboardingValues,
        skip: boolean,
        optionalFields: string[],
      ) => {
        return isCurrentPageValid(key, skip, optionalFields);
      },
    },
    {
      element: <VehicleInfo form={form} updateVehicle={updateVehicle} />,
      optional: true,
      key: "vehicle",
      optionalFields: [],
      verificationFunction: (
        key: keyof onboardingValues,
        skip: boolean,
        optionalFields: string[],
      ) => {
        return isCurrentPageValid(key, skip, optionalFields);
      },
    },
    {
      element: (
        <VehicleInsurance form={form} updateInsurance={updateInsurance} />
      ),
      optional: true,
      key: "insurance",
      optionalFields: [],
      verificationFunction: (
        key: keyof onboardingValues,
        skip: boolean,
        optionalFields: string[],
      ) => {
        return isCurrentPageValid(key, skip, optionalFields);
      },
    },
    {
      element: (
        <ProfilePhoto form={form} updateProfilePhoto={updateProfilePhoto} />
      ),
      optional: true,
      key: "profile",
      optionalFields: [],
      verificationFunction: (
        key: keyof onboardingValues,
        skip: boolean,
        optionalFields: string[],
      ) => {
        return isCurrentPageValid(key, skip, optionalFields);
      },
    },
    {
      element: (
        <BackgroundCheck form={form} updateBackground={updateBackground} />
      ),
      optional: true,
      key: "background",
      optionalFields: [],
      verificationFunction: (
        key: keyof onboardingValues,
        skip: boolean,
        optionalFields: string[],
      ) => {
        return isCurrentPageValid(key, skip, optionalFields);
      },
    },
  ];
  const submit = useSubmit();
  const handlePrev = () => {
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    if (pageNumber < pages.length) {
      setPageNumber(pageNumber + 1);
    }
  };
  const [pageNumber, setPageNumber] = useState(-1);
  useEffect(() => {
    if (pageNumber === pages.length) {
      const form = new FormData();
      form.append("status", "true");
      form.append("onboarding-type", "driver");
      submit(form, { method: "PATCH" });
    }
  }, [pageNumber]);
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper withBorder radius="lg" shadow="sm" p="xl" maw={700} w="100%">
        <Group>
          <Stack>
            <Text>Driver Application</Text>
            <Stepper
              active={pageNumber}
              size="sm"
              iconSize={36}
              p={"md"}
              orientation="vertical"
              styles={{
                step: { padding: "8px 4px" }, // Compact step padding
                stepIcon: { width: 32, height: 32 }, // Smaller icons
              }}
            >
              <Stepper.Step description="Welcome" />
              <Stepper.Step description="Personal Info" />
              <Stepper.Step description="Home Address" />
              <Stepper.Step description="Driver License" />
              <Stepper.Step description="Vehicle Information" />
              <Stepper.Step description="Vehicle Insurance" />
              <Stepper.Step description="Profile picture" />
              <Stepper.Step description="Background" />
            </Stepper>
          </Stack>
          <Divider orientation="vertical" />
          <Transition mounted transition="fade-left" duration={250} keepMounted>
            {(styles) => (
              <Box key={pageNumber} style={styles} p={"md"}>
                {pageNumber < 0 ? <WelcomePage /> : pages[pageNumber].element}
              </Box>
            )}
          </Transition>
          <Group justify="space-between">
            <Button onClick={handlePrev}>Back</Button>
            <Button
              onClick={handleNext}
              disabled={
                disableBtn ||
                (pageNumber > 0
                  ? pages[pageNumber].verificationFunction(
                      pages[pageNumber].key,
                      pages[pageNumber].optional,
                      pages[pageNumber].optionalFields,
                    )
                  : false)
              }
            >
              {pageNumber < pages.length - 1 ? "Next" : "Finish"}
            </Button>
          </Group>
        </Group>
      </Paper>
    </Box>
  );
};
