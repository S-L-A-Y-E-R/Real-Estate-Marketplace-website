"use client";

import { useUserStore } from "@/hooks/user-store";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userStore: any = useUserStore();
  const { push } = useRouter();

  if (!userStore.user) {
    push("/login");
  }

  return (
    <div className="overflow-x-hidden md:overflow-y-hidden bg-[#F1F5F1]">
      {children}
    </div>
  );
}
