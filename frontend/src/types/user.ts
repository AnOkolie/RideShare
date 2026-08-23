export type UserRole = "driver" | "rider";

export type driverShape = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  vehicle: string;
  rating: number;
};

export type userStructure = {
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  id: string;
  phoneNumber: string;
  profilePic: string;
};
