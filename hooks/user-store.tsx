import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "@/types/userType";

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
