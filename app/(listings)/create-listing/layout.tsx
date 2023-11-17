"use client";

import { useUserStore } from "@/hooks/user-store";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userStore: any = useUserStore();

  if (!userStore.user) {
    return redirect("/login");
  }

  return (
    <div className="overflow-x-hidden md:overflow-y-hidden bg-[#F1F5F1]">
      {children}
    </div>
  );
}
