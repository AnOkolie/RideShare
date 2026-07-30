export type onboardingValues = {
  user: {
    publicName: string;

    phone: string;

    profilePicture: File | null;
  };

  emergencyContact: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };

  home: {
    address: string;
  };

  payment: {
    cardNumber: string;

    firstName: string;

    lastName: string;

    expiration: string;

    cvv: string;
  };
};

export type HomeAddressProps = {
  form: onboardingValues;
  updateAddress: <K extends keyof onboardingValues["home"]>(
    key: K,
    value: string,
  ) => void;
  //   setForm: React.Dispatch<React.SetStateAction<onboardingValues>>;
};

export type EmergencyProps = {
  form: onboardingValues;
  updateEmergencyContact: (
    key: "firstName" | "lastName" | "phoneNumber",
    value: string,
  ) => void;
};
export type PaymentProps = {
  form: onboardingValues;
  updatePayment: (
    key: "firstName" | "lastName" | "cardNumber" | "expiration" | "cvv",
    value: string,
  ) => void;
};

export type UserProps = {
  form: onboardingValues;
  updateUser: (
    key: "publicName" | "phone" | "profilePicture",
    value: string,
  ) => void;
  updateAvatar: (key: "profilePicture", value: File | null) => void;
};

export const defaultOnboarding = {
  user: {
    publicName: "",

    phone: "",
    profilePicture: null,
  },
  emergencyContact: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  },
  home: {
    address: "",
  },

  payment: {
    cardNumber: "",
    expiration: "",
    cvv: "",
    firstName: "",
    lastName: "",
  },
};

export type pagesStructure = {
  element: React.ReactNode;
  title: string;
  subtitle: string;
  optional: boolean;
  key: keyof onboardingValues;
  verificationFunction: (
    key: keyof onboardingValues,
    skip: boolean,
    optionalFields: string[],
  ) => boolean;
  optionalFields: string[];
};

export const optionalFields = {
  user: ["profilePicture"],
  home: [],
  payment: [],
  emergencyContact: [],
};
