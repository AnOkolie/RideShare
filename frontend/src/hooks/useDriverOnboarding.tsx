import { useState } from "react";
import type { onboardingValues } from "~/types/Onboarding/Driver";
import { defaultOnboarding } from "~/types/Onboarding/Driver";

export const useDriverOnboarding = () => {
  const [form, setForm] = useState<onboardingValues>(defaultOnboarding);
  const [disableBtn, setDisabelBtn] = useState(false);
  const updateLicense = (
    key: keyof onboardingValues["license"],
    value: string | File | null,
  ) => {
    setForm((prev) => ({
      ...prev,
      payment: {
        ...prev.license,
        [key]: value,
      },
    }));
  };
  const updateInsurance = (
    key: keyof onboardingValues["insurance"],
    value: string | File | null,
  ) => {
    setForm((prev) => ({
      ...prev,
      insurance: {
        ...prev.insurance,
        [key]: value,
      },
    }));
  };
  const updateBackground = (
    key: keyof onboardingValues["background"],
    value: boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      background: {
        [key]: value,
      },
    }));
  };
  const updateProfilePhoto = (
    key: keyof onboardingValues["profile"],
    value: File | null,
  ) => {
    setForm((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }));
  };
  const updateVehicle = (
    key: keyof onboardingValues["vehicle"],
    value: string | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [key]: value,
      },
    }));
  };
  const updateAddress = (
    key: keyof onboardingValues["address"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      home: {
        ...prev.address,
        [key]: value,
      },
    }));
  };

  const updateDriver = <K extends keyof onboardingValues["driver"]>(
    key: K,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      driver: {
        ...prev.driver,
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
  };
};
