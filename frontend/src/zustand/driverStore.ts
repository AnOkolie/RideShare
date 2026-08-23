import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { driverProfile } from "~/types/Onboarding/Driver";

type DriveStore = {
  driver: driverProfile | null;
  setDriver: (newRider: driverProfile) => void;
  clearDriver: () => void;
};
export const driverStore = create<DriveStore>()(
  persist(
    (set) => ({
      driver: null,
      setDriver: (newRider) => {
        set({ driver: newRider });
      },
      clearDriver: () =>
        set({
          driver: null,
        }),
    }),
    {
      name: "driver-profile",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
