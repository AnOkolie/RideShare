import { useState } from "react";
import { riderProfileValues, type riderStructure } from "~/types/riderProfile";

export const useRiderProfile = () => {
  const [changes, setChanges] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [form, setForm] = useState<riderStructure>(riderProfileValues);

  const updatePersonalInfo = (
    key: keyof riderStructure["personalInfo"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: value,
      },
    }));
    flipDisableBtn();
  };
  const updateProfile = (
    key: keyof riderStructure["profile"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }));
    flipDisableBtn();
  };
  const updateRiderInfo = (
    key: keyof riderStructure["riderInfo"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      riderInfo: {
        ...prev.riderInfo,
        [key]: value,
      },
    }));
    flipDisableBtn();
  };
  const flipDisableBtn = () => {
    setDisableBtn(false);
  };
  return {
    form,
    disableBtn,
    changes,
    updatePersonalInfo,
    updateProfile,
    updateRiderInfo,
  };
};
