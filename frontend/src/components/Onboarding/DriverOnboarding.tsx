import { Paper, Box, Button, Group } from "@mantine/core";
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
export const DriverOnboarding = () => {
  const {
    form,
    updateAddress,
    updateDriver,
    updateProfilePhoto,
    updateInsurance,
    updateBackground,
    updateVehicle,
    updateLicense,
    isCurrentPageValid,
  } = useDriverOnboarding();

  const pages = [
    {
      elemnt: <WelcomePage />,
    },
    {
      element: <PersonalInfo form={form} updateDriver={updateDriver} />,
      optional: false,
      key: "rider",
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
      key: "emergencyContact",
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
      key: "home",
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
      key: "payment",
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
      key: "payment",
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
      key: "payment",
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
      key: "payment",
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
  const handlePrev = () => {
    setPageNum(pageNum - 1);
  };
  const handleNext = () => {
    if (pageNum < pages.length) {
      setPageNum(pageNum + 1);
    }
  };
  const [pageNum, setPageNum] = useState(0);
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper>{pages[pageNum].element}</Paper>
      <Group justify="space-between">
        <Button onClick={handlePrev}>Back</Button>
        <Button onClick={handleNext}>
          {pageNum < pages.length - 1 ? "Next" : "Finish"}
        </Button>
      </Group>
    </Box>
  );
};
