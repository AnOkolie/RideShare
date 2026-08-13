import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserRole } from "~/types/user";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  role: UserRole;
  emailVerified: boolean;
  id: string;
};

type UserStore = {
  user: User | null;
  token: string;
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  updateUser: (updates: Partial<User>) => void;

  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      role: null,
      setRole: (role) => set({ role: role }),
      setUser: (user) => set({ user }),
      setToken: (newToken) => set({ token: newToken }),

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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
