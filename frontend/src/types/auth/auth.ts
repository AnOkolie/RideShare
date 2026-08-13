export type syncUser = {
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  id: string;
  role: "rider" | "driver";
  profilePic: string;
};

export type authUser = {};
