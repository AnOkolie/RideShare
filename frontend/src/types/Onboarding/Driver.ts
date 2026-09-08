import { todaysDate } from "~/utils/date";
import { type DropzoneProps } from "@mantine/dropzone";
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
    make: string;
    model: string;
    year: string;
    colour: string;
    licensePlate: string;
    seats: number;
  };
  insurance: {
    insurance: File | null;
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
    DoB: todaysDate(),
  },
  address: {
    address: "",
  },
  license: {
    front: null,
    back: null,
    expiry: todaysDate(),
    number: "",
  },
  vehicle: {
    make: "",
    model: "",
    year: "",
    colour: "rgba(47, 119, 150, 0.7)",
    licensePlate: "",
    seats: 0,
  },
  insurance: {
    insurance: null,
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
    key: "make" | "model" | "year" | "colour" | "licensePlate" | "seats",
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
  pageNum: number;
};

export type PageStructure = {
  element: React.ReactNode;
  title?: string;
  section: number;
  optional?: boolean;
  requiredValues: () => unknown[];
};

export type PagesStructure = PageStructure[];

export type driverProfile = {
  fullName: string;
  lat: number;
  lng: number;
  status: "ONLINE" | "OFFLINE" | "BUSY";
  driverOnboarding: boolean;
  rating: number;
  totalTrips: number;
  approvalStatus: "APPROVED" | "PENDING" | "REJECTED";
  vehicle: VehicleStructure;
};

export type VehicleStructure = {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  seats: number;
  vehicleType: VehicleType;
  approved: boolean;
};

enum VehicleType {
  SEDAN,
  SUV,
}

export type UploadProps = {
  updateLicense: (
    key: "number" | "front" | "back" | "expiry",
    value: string | File | null,
  ) => void;
  form: onboardingValues;
} & Partial<DropzoneProps>;

export type CompleteDriverOnboardingRequest = {
  driver: {
    name: string;
    phone: string;
    DoB: string | null;
  };
  address: {
    address: string;
  };
  license: {
    front: string;
    back: string;
    expiry: string | null;
    number: string;
  };
  vehicle: {
    make: string;
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
    profilePicture: string;
  };
  background: {
    consent: boolean;
  };
};
