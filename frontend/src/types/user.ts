export type UserRole = "driver" | "rider";

export type driverShape = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  vehicle: string;
  rating: number;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  emailVerified: boolean;
  id: string;
  phoneNumber: string;
};
