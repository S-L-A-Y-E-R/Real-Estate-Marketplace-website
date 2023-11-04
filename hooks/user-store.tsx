import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = null | {
  refreshToken: string;
  accessToken: string;
  id: string;
  name: string;
  email: string;
  photo: string;
};

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
