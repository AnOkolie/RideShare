import { getMake } from "~/api/vehicle";

export const makeLoader = async () => {
  const response = await getMake();
  return response.data;
};
