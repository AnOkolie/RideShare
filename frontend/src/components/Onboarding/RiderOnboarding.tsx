import {
  Text,
  Box,
  Button,
  Title,
  Paper,
  Stepper,
  Transition,
} from "@mantine/core";
import {
  ADDRESS_HEADER,
  ADDRESS_SUBTITLE,
  EMERGENCY_CONTACT_HEADER,
  EMERGENCY_CONTACT_SUBTITLE,
  PAYMENT_HEADER,
  PAYMENT_SUBTITLE,
  PROFILE_HEADER,
  PROFILE_SUBTITLE,
} from "~/utils/string";
import { UserInfo } from "./RiderOnboarding/UserInfo";
import { EmergencyContact } from "./RiderOnboarding/EmergencyContact";
import { HomeAddress } from "./RiderOnboarding/HomeAddress";
import { PaymentInfo } from "./RiderOnboarding/PaymentInfo";
import { useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { useRiderOnboarding } from "~/hooks/useRiderOnboarding";
import type {
  onboardingValues,
  pagesStructure,
} from "~/types/Onboarding/Rider";
import {
  IconArrowLeft,
  IconArrowRight,
  IconShieldCheck,
} from "@tabler/icons-react";
import classes from "./Onboarding.module.css";

export const RiderOnBoarding = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const {
    form,
    updateEmergencyContact,
    updateAddress,
    updateUser,
    updatePayment,
    updateAvatar,
    isCurrentPageValid,
  } = useRiderOnboarding();
  const pages: pagesStructure[] = [
    {
      element: (
        <UserInfo
          form={form}
          updateUser={updateUser}
          updateAvatar={updateAvatar}
        />
      ),
      title: PROFILE_HEADER,
      subtitle: PROFILE_SUBTITLE,
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
      element: (
        <EmergencyContact
          form={form}
          updateEmergencyContact={updateEmergencyContact}
        />
      ),
      title: EMERGENCY_CONTACT_HEADER,
      subtitle: EMERGENCY_CONTACT_SUBTITLE,
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
      element: <HomeAddress form={form} updateAddress={updateAddress} />,
      title: ADDRESS_HEADER,
      subtitle: ADDRESS_SUBTITLE,
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
      element: <PaymentInfo form={form} updatePayment={updatePayment} />,
      title: PAYMENT_HEADER,
      subtitle: PAYMENT_SUBTITLE,
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
  const submit = useSubmit();
  const PAGES_LENGTH = pages.length - 1;
  const navigate = useNavigate();
  const handleNext = () => {
    if (pageNumber === PAGES_LENGTH) {
      submitOnboarding();
      return;
    }
    if (pageNumber > PAGES_LENGTH) return;
    setPageNumber(pageNumber + 1);
  };
  const handlePrev = () => {
    setPageNumber(pageNumber - 1);
  };
  //the dependencies make this trigger wrongly, maybe put it in a handlesubmit instead

  const submitOnboarding = async () => {
    console.log("Rider onboarding form: ", form);
    const formData = new FormData();
    formData.append("status", "true");
    formData.append("onboarding-type", "rider");
    formData.append("rider", JSON.stringify(form));
    submit(formData, { method: "PATCH" });
    navigate("/rider");
  };
  return (
    <Box className={classes.page}>
      <Box className={classes.shell}>
        <Box className={classes.topbar}>
          <Text className={classes.brand}>RIDESHARE</Text>
          <Text className={classes.saveCopy}>
            Your progress is saved as you go
          </Text>
        </Box>
        <Paper className={classes.workspace} p={0}>
          <Box className={classes.rail}>
            <Text className={classes.railEyebrow}>RIDER SETUP</Text>
            <Text className={classes.railTitle}>
              Make every pickup feel familiar.
            </Text>
            <Box className={classes.stepper}>
              <Stepper
                active={pageNumber}
                size="sm"
                iconSize={36}
                orientation="vertical"
              >
                <Stepper.Step
                  label="Your profile"
                  description="How riders see you"
                />
                <Stepper.Step label="Safety contact" description="Optional" />
                <Stepper.Step
                  label="Home address"
                  description="For quicker pickups"
                />
                <Stepper.Step label="Payment" description="Optional for now" />
              </Stepper>
            </Box>
            <Text className={classes.railFoot}>
              <IconShieldCheck
                size={15}
                style={{ verticalAlign: "text-bottom", marginRight: 6 }}
              />
              Your details help us create safer, smoother trips.
            </Text>
          </Box>
          <Box className={classes.content}>
            <Box className={classes.contentHead}>
              <Text className={classes.stepBadge}>
                STEP {pageNumber + 1} OF {pages.length}
                {pages[pageNumber].optional && (
                  <span className={classes.optional}>OPTIONAL</span>
                )}
              </Text>
              <Title className={classes.contentTitle}>
                {pages[pageNumber].title}
              </Title>
              <Text className={classes.contentSubtitle}>
                {pages[pageNumber].subtitle}
              </Text>
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
                    {pages[pageNumber].element}
                  </Box>
                )}
              </Transition>
            </Box>
            <Box className={classes.actions}>
              <Button
                variant="subtle"
                disabled={pageNumber === 0}
                onClick={handlePrev}
                leftSection={<IconArrowLeft size={16} />}
              >
                Back
              </Button>

              <Button
                onClick={handleNext}
                className={classes.next}
                rightSection={<IconArrowRight size={16} />}
                disabled={pages[pageNumber].verificationFunction(
                  pages[pageNumber].key,
                  pages[pageNumber].optional,
                  pages[pageNumber].optionalFields,
                )}
              >
                {pageNumber === PAGES_LENGTH ? "Complete setup" : "Continue"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
