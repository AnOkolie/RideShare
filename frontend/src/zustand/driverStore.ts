import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { driverProfile } from "~/types/Onboarding/Driver";

type DriveStore = {
  driver: driverProfile | null;
  status: "ONLINE" | "OFFLINE" | "BUSY";
  setDriver: (newRider: driverProfile) => void;
  setStatus: (status: "ONLINE" | "OFFLINE" | "BUSY") => void;
  clearDriver: () => void;
};
export const driverStore = create<DriveStore>()(
  persist(
    (set) => ({
      driver: null,
      status: "OFFLINE",
      setDriver: (newRider) => {
        set({ driver: newRider });
      },
      clearDriver: () =>
        set({
          driver: null,
        }),
      setStatus: (status) => set({ status }),
    }),
    {
      name: "driver-profile",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
