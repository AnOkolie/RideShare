import { useState } from "react";
import type { onboardingValues } from "~/types/Onboarding/Rider";
import { defaultOnboarding } from "~/types/Onboarding/Rider";

export const useRiderOnboarding = () => {
  const [form, setForm] = useState<onboardingValues>(defaultOnboarding);
  const updatePayment = (
    key: keyof onboardingValues["payment"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [key]: value,
      },
    }));
  };

  const updateEmergencyContact = (
    key: keyof onboardingValues["emergencyContact"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [key]: value,
      },
    }));
  };
  const updateAddress = (
    key: keyof onboardingValues["home"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        [key]: value,
      },
    }));
  };

  type updateAvatarType = "profilePicture";
  const updateUser = <K extends keyof onboardingValues["rider"]>(
    key: K,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      rider: {
        ...prev.rider,
        [key]: value,
      },
    }));
  };

  const updateAvatar = (key: updateAvatarType, value: File | null) => {
    setForm((prev) => ({
      ...prev,
      user: {
        ...prev.rider,
        [key]: value,
      },
    }));
  };

  const isCurrentPageValid = <K extends keyof onboardingValues>(
    key: K,
    skip: boolean,
    optionalFields: string[],
  ) => {
    const keys = Object.keys(form[key]) as Array<keyof onboardingValues[K]>;

    for (const term of keys) {
      const value = form[key][term];

      if (term in ["profilePicture"]) console.log("equal");
      if (
        !skip &&
        (value === null || value === "") &&
        !compareStrings(term, optionalFields)
      )
        return true;
    }
    return false;
  };

  const compareStrings = (
    key: string | number | symbol,
    optionalFields: string[],
  ) => {
    for (const str of optionalFields) {
      if (key === str) {
        return true;
      }
    }
    return false;
  };
  return {
    form,
    updateAddress,
    updateUser,
    updatePayment,
    updateAvatar,
    updateEmergencyContact,
    isCurrentPageValid,
  };
};
