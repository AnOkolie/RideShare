import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserRole = "driver" | "rider";

type User = {
  username: string;
  email: string;
  profilePic: string;
  role: UserRole;
};

type UserStore = {
  user: User | null;

  setUser: (user: User) => void;

  updateUser: (updates: Partial<User>) => void;

  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...updates,
              }
            : null,
        })),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
