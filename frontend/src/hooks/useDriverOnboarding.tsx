import { useEffect, useState } from "react";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import type {
  onboardingValues,
  PageStructure,
} from "~/types/Onboarding/Driver";
import { defaultOnboarding } from "~/types/Onboarding/Driver";
import { s3Upload } from "~/utils/aws/s3Upload";
import {
  formatDriverOnboarding,
  driverOnboardingStructure,
} from "~/utils/formatResponse/driverOnboarding";
import { displayNotifications } from "~/utils/notifications/displayNotification";

export const useDriverOnboarding = () => {
  const [form, setForm] = useState<onboardingValues>(defaultOnboarding);

  const [disableBtn, setDisabelBtn] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();
  useEffect(() => {
    if (!actionData) return;
    console.log("action data", actionData);
    if (actionData.data) {
      navigate("/driver");
    }
  }, [actionData]);

  const handlePrev = () => {
    setPageNumber((prev) => Math.max(prev - 1, 0));
  };

  const formSubmit = async () => {
    if (
      !form.license.back ||
      !form.license.front ||
      !form.insurance.insurance
    ) {
      displayNotifications(
        "Missing Required Fields",
        "Please upload all required documents",
        "red",
      );
    }
    const { license, insurance, profile } = await fileUpload();
    const formData = new FormData();
    formData.append("intent", "update");
    formData.append(
      "driver",
      JSON.stringify(
        driverOnboardingStructure(
          form,
          license.frontKey,
          license.backKey,
          insurance,
        ),
      ),
    );
    formData.append("onboarding-type", "driver");
    formData.append("status", "driver");
    submit(formData, {
      method: "POST",
    });
  };
  const fileUpload = async () => {
    const license = await licenseUpload();
    const profile = await profileUpload();
    const insurance = await insuranceUpload();
    return { license, profile, insurance };
  };
  const licenseUpload = async () => {
    const [frontKey, backKey] = await Promise.all([
      s3Upload(form.license.front!, "DRIVER_DOCUMENT", "DRIVER"),
      s3Upload(form.license.back!, "DRIVER_DOCUMENT", "DRIVER"),
    ]);

    return {
      frontKey,
      backKey,
    };
  };

  const insuranceUpload = async () => {
    return {
      insuranceKey: await s3Upload(
        form.insurance.insurance!,
        "INSURANCE_DOCUMENT",
        "DRIVER",
      ),
    };
  };

  const profileUpload = async () => ({
    profilePictureKey: form.profile.profilePicture
      ? await s3Upload(form.profile.profilePicture, "PROFILE_PICTURE", "DRIVER")
      : null,
  });
  const handleNext = (isLastPage: boolean) => {
    if (isLastPage) {
      formSubmit();
      return;
    }
    setPageNumber(pageNumber + 1);
  };
  const updateLicense = (
    key: keyof onboardingValues["license"],
    value: string | File | null,
  ) => {
    setForm((prev) => ({
      ...prev,
      license: {
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
      address: {
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

  const isPageInvalid = (page: PageStructure) => {
    if (page.optional) {
      return false;
    }
    return page.requiredValues().some((value) => {
      if (value === null || value === undefined || value === "") {
        // console.log(`value (element # ${index}: from array ${arr}: ${value}`);
        return true;
      }
      return false;
    });
  };
  return {
    form,
    disableBtn,
    pageNumber,
    handleNext,
    handlePrev,
    setDisabelBtn,
    updateAddress,
    updateDriver,
    updateProfilePhoto,
    updateInsurance,
    updateBackground,
    updateVehicle,
    updateLicense,
    isPageInvalid,
  };
};
