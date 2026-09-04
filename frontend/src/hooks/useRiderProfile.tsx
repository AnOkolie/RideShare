import { useState } from "react";
import { riderProfileValues, type riderStructure } from "~/types/riderProfile";
import { getHomeCoordinates } from "../utils/address";

export const useRiderProfile = () => {
  const [changes, _setChanges] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [changedAddress, setChangedAddress] = useState(false);
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
    value: string | number,
  ) => {
    if (key === "homeAddress") setChangedAddress(true);
    setForm((prev) => ({
      ...prev,
      riderInfo: {
        ...prev.riderInfo,
        [key]: value,
      },
    }));
    flipDisableBtn();
  };
  const getHomeDetails = async () => {
    if (!form.riderInfo.homeAddress) return;
    const { lat, lng, placeId } = await getHomeCoordinates(
      form.riderInfo.homeAddress,
    );
    updateRiderInfo("homePlaceId", placeId);
    updateRiderInfo("homeLatitude", lat);
    updateRiderInfo("homeLongitude", lng);
  };

  const flipDisableBtn = () => {
    setDisableBtn(false);
  };
  return {
    form,
    disableBtn,
    changedAddress,
    getHomeDetails,
    changes,
    updatePersonalInfo,
    updateProfile,
    updateRiderInfo,
  };
};
