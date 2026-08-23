import { riderStore } from "~/zustand/riderStore";
import { useUserStore } from "~/zustand/userStore";
import type { userStructure } from "./user";
import type { riderProfile } from "./Onboarding/Rider";

const profile = riderStore.getState().rider;
const user = useUserStore.getState().user;
export const riderProfileValues = {
  personalInfo: {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    displayName: user?.firstName ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
  },
  profile: {
    profilePic: user?.profilePic ?? null,
  },
  riderInfo: {
    homeAddress: profile?.homeAddress ?? "",
  },
};

export type riderStructure = {
  personalInfo: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phoneNumber: string;
  };
  profile: {
    profilePic: string | null;
  };
  riderInfo: {
    homeAddress: string;
  };
};

export type riderActionStructure = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  displayName: string;
  profilePic: string;
  homeAddress: string;
};

export type riderUpdateResponse = {
  userProfile: userStructure;
  riderProfile: riderProfile;
};

export type riderProfileOptions = {
  element: React.ReactNode;
  description: string;
  verificationFunction: (key: keyof riderStructure, value: string) => boolean;
};
