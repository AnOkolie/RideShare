import {
  Paper,
  Box,
  Button,
  Stepper,
  Transition,
  Text,
  Title,
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
import { IconArrowLeft, IconArrowRight, IconShieldCheck } from "@tabler/icons-react";
import classes from "./Onboarding.module.css";
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
      title: "Tell us about yourself",
      subtitle: "This information is used to verify your driving profile.",
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
      title: "Add your home address",
      subtitle: "Your address stays private and helps us support your account.",
      optional: true,
      requiredValues: () => [form.address.address],
      element: <HomeAddress form={form} updateAddress={updateAddress} />,
    },

    {
      section: 2,
      title: "Upload the front of your licence",
      subtitle: "Use a clear, unedited photo with all edges visible.",
      optional: false,
      requiredValues: () => [form.license.front],
      element: <LicenseFront updateLicense={updateLicense} form={form} />,
    },

    {
      section: 2,
      title: "Upload the back of your licence",
      subtitle: "We need both sides to validate your licence.",
      optional: false,
      requiredValues: () => [form.license.back],
      element: <LicenseBack updateLicense={updateLicense} form={form} />,
    },

    {
      section: 2,
      title: "When does your licence expire?",
      subtitle: "Keep this up to date so you can stay ready to drive.",
      optional: false,
      requiredValues: () => [form.license.expiry],
      element: <ExpiryUpload updateLicense={updateLicense} form={form} />,
    },

    {
      section: 2,
      title: "Enter your licence number",
      subtitle: "This is used only for driver verification.",
      optional: false,
      requiredValues: () => [form.license.number],
      element: <LicenseNumber updateLicense={updateLicense} form={form} />,
    },

    {
      section: 3,
      title: "Add your vehicle",
      subtitle: "Riders see these details when you are on the way.",
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
      title: "Upload proof of insurance",
      subtitle: "Your document is encrypted and reviewed securely.",
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
      title: "Choose a profile photo",
      subtitle: "A clear photo helps riders recognize their driver.",
      optional: true,
      requiredValues: () => [form.profile.profilePicture],
      element: (
        <ProfilePhoto form={form} updateProfilePhoto={updateProfilePhoto} />
      ),
    },

    {
      section: 6,
      title: "Background check consent",
      subtitle: "Review the disclosure and confirm to complete your application.",
      optional: false,
      requiredValues: () => [form.background.consent],
      element: (
        <BackgroundCheck form={form} updateBackground={updateBackground} />
      ),
    },
  ];
  const page = pages[pageNumber];

  return (
    <Box className={classes.page}>
      <Box className={classes.shell}>
        <Box className={classes.topbar}>
          <Text className={classes.brand}>RIDESHARE</Text>
          <Text className={classes.saveCopy}>Driver application · secure document upload</Text>
        </Box>
        <Paper className={classes.workspace} p={0}>
          <Box className={classes.rail}>
            <Text className={classes.railEyebrow}>DRIVER APPLICATION</Text>
            <Text className={classes.railTitle}>Let’s get you ready to earn.</Text>
            <Box className={classes.stepper}>
              <Stepper
                active={page.section}
                size="sm"
                iconSize={36}
                orientation="vertical"
              >
                <Stepper.Step label="Personal details" description="Identity" />
                <Stepper.Step label="Home address" description="Account support" />
                <Stepper.Step label="Driver licence" description="Verification" />
                <Stepper.Step label="Vehicle" description="Ride details" />
                <Stepper.Step label="Insurance" description="Required" />
                <Stepper.Step label="Profile photo" description="Optional" />
                <Stepper.Step label="Consent" description="Final review" />
              </Stepper>
            </Box>
            <Text className={classes.railFoot}><IconShieldCheck size={15} style={{ verticalAlign: "text-bottom", marginRight: 6 }} />Your documents are only used to verify eligibility to drive.</Text>
          </Box>
          <Box className={classes.content}>
            <Box className={classes.contentHead}>
              <Text className={classes.stepBadge}>STEP {pageNumber + 1} OF {pages.length}{page.optional && <span className={classes.optional}>OPTIONAL</span>}</Text>
              <Title className={classes.contentTitle}>{page.title}</Title>
              <Text className={classes.contentSubtitle}>{page.subtitle}</Text>
            </Box>
            <Box className={classes.formArea}>
            <Transition
              mounted
              transition="fade-left"
              duration={250}
              keepMounted
            >
              {(styles) => (
                <Box key={pageNumber} style={styles}>
                  {pageNumber < 0 ? <WelcomePage /> : page.element}
                </Box>
              )}
            </Transition>
            </Box>
            <Box className={classes.actions}>
              <Button variant="subtle" disabled={pageNumber === 0} onClick={handlePrev} leftSection={<IconArrowLeft size={16} />}>Back</Button>
              <Button
                onClick={() => handleNext(pageNumber === pages.length - 1)}
                className={classes.next}
                rightSection={<IconArrowRight size={16} />}
                disabled={isPageInvalid(page)}
              >
                {pageNumber < pages.length - 1 ? "Continue" : "Submit application"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
