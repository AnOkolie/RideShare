export type onboardingValues = {
  driver: {
    name: string;
    phone: string;
    DoB: string | null;
  };
  address: {
    address: string;
  };
  license: {
    front: File | null;
    back: File | null;
    expiry: string | null;
    number: string;
  };
  vehicle: {
    manufacturer: string;
    model: string;
    year: string;
    colour: string;
    licensePlate: string;
    seats: number;
  };
  insurance: {
    insurance: string;
    expiration: string | null;
  };
  profile: {
    profilePicture: File | null;
  };
  background: {
    consent: boolean;
  };
};

export const defaultOnboarding = {
  driver: {
    name: "",
    phone: "",
    DoB: null,
  },
  address: {
    address: "",
  },
  license: {
    front: null,
    back: null,
    expiry: null,
    number: "",
  },
  vehicle: {
    manufacturer: "",
    model: "",
    year: "",
    colour: "rgba(47, 119, 150, 0.7)",
    licensePlate: "",
    seats: 0,
  },
  insurance: {
    insurance: "",
    expiration: null,
  },
  profile: {
    profilePicture: null,
  },
  background: {
    consent: false,
  },
};

export type ProfilePhotoProps = {
  form: onboardingValues;
  updateProfilePhoto: (key: "profilePicture", value: File | null) => void;
};

export type BackgroundCheckProps = {
  form: onboardingValues;
  updateBackground: (key: "consent", value: boolean) => void;
};

export type DriverProps = {
  form: onboardingValues;
  updateDriver: (key: "name" | "phone" | "DoB", value: string) => void;
};

export type AddressProps = {
  form: onboardingValues;
  updateAddress: (key: "address", value: string) => void;
};

export type VehicleProps = {
  form: onboardingValues;
  updateVehicle: (
    key:
      "manufacturer" | "model" | "year" | "colour" | "licensePlate" | "seats",
    value: string | number,
  ) => void;
};

export type InsuranceProps = {
  form: onboardingValues;
  updateInsurance: (
    key: "insurance" | "expiration",
    value: string | File | null,
  ) => void;
};

export type LicenseProps = {
  form: onboardingValues;
  updateLicense: (
    key: "front" | "back" | "expiry" | "number",
    value: string | File | null,
  ) => void;
};

export type pagesStructure = {
  element: React.ReactNode;
  title?: string;
  subtitle?: string;
  optional: boolean;
  key: keyof onboardingValues;
  verificationFunction: (
    key: keyof onboardingValues,
    skip: boolean,
    optionalFields: string[],
  ) => boolean;
  optionalFields: string[];
};

export type driverProfile = {
  fullName: string;
  lat: number;
  lng: number;
  status: "accepted" | "declined";
  driverOnboarding: boolean;
};
