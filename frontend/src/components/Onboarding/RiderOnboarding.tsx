import {
  Text,
  Box,
  Group,
  Button,
  Title,
  Paper,
  Stepper,
  Transition,
  Divider,
  Stack,
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
import { useEffect, useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { useRiderOnboarding } from "~/hooks/useRiderOnboarding";
import type {
  onboardingValues,
  pagesStructure,
} from "~/types/Onboarding/Rider";

export const RiderOnBoarding = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [finish, setFinish] = useState(false);
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
      setFinish(true);
      return;
    }
    if (pageNumber > PAGES_LENGTH) return;
    setPageNumber(pageNumber + 1);
  };
  const handlePrev = () => {
    setPageNumber(pageNumber - 1);
  };
  useEffect(() => {
    if (finish) {
      const form = new FormData();
      form.append("status", "true");
      form.append("onboarding-type", "rider");
      submit(form, { method: "PATCH" });
      //if successful navigate
      navigate("/rider");
      return;
    }
  }, [pageNumber, finish]);
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
        <Group wrap="nowrap">
          <Stepper
            active={pageNumber}
            size="md"
            iconSize={36}
            p={"md"}
            orientation="vertical"
          >
            <Stepper.Step label="Profile" />

            <Stepper.Step label="Emergency" />

            <Stepper.Step label="Address" />

            <Stepper.Step label="Payment" />
          </Stepper>
          <Group>
            <Divider size={"md"} orientation="vertical" />
            <Stack>
              <Title order={2}>{pages[pageNumber].title}</Title>

              <Text c="dimmed">{pages[pageNumber].subtitle}</Text>
              <Divider />
              <Transition
                mounted
                transition="fade-left"
                duration={250}
                keepMounted
              >
                {(styles) => (
                  <Box key={pageNumber} style={styles} p={"md"}>
                    {pages[pageNumber].element}
                  </Box>
                )}
              </Transition>

              <Group justify="space-between" mt="xl">
                <Button
                  variant="subtle"
                  disabled={pageNumber === 0}
                  onClick={handlePrev}
                >
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={pages[pageNumber].verificationFunction(
                    pages[pageNumber].key,
                    pages[pageNumber].optional,
                    pages[pageNumber].optionalFields,
                  )}
                >
                  {pageNumber === PAGES_LENGTH ? "Finish" : "Continue"}
                </Button>
              </Group>
            </Stack>
          </Group>
        </Group>
      </Paper>
    </Box>
  );
};
