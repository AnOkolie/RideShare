import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { riderProfile } from "~/types/Onboarding/Rider";

type RideStore = {
  rider: riderProfile | null;
  setRider: (newRider: riderProfile) => void;
  clearRider: () => void;
};
export const riderStore = create<RideStore>()(
  persist(
    (set) => ({
      rider: null,
      setRider: (newRider) => {
        set({ rider: newRider });
      },
      clearRider: () =>
        set({
          rider: null,
        }),
    }),
    {
      name: "rider-profile",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
