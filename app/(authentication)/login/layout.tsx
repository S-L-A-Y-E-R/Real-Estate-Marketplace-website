"use client";

import { useUserStore } from "@/hooks/user-store";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userStore: any = useUserStore();
  const { push } = useRouter();

  if (userStore.user) {
    push("/");
  }

  return <div className=" overflow-hidden">{children}</div>;
}
