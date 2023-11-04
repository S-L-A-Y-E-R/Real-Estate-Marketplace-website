"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import HeaderMenu from "./header-menu";
import { NavLinks } from "./navlinks";
import { useState } from "react";
import { useEffect } from "react";

import { useUserStore } from "@/hooks/user-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const pathname = usePathname();
  const userStore: any = useUserStore();

  if (!mounted) return null;

  return (
    <>
      <nav className="md:flex items-center gap-5 hidden">
        {NavLinks.map((link, i) => (
          <Link
            key={i}
            href={link.path}
            className={clsx("text-slate-500 hover:text-slate-950", {
              "text-slate-950": pathname === link.path,
            })}
          >
            {link.name}
          </Link>
        ))}
        {!userStore.user && (
          <Link
            href={"/login"}
            className={clsx("text-slate-500 hover:text-slate-950", {
              "text-slate-950": pathname === "/login",
            })}
          >
            Login
          </Link>
        )}
        {userStore.user && (
          <Link href={"/profile"}>
            <Avatar>
              <AvatarImage src={userStore.user.photo} />
              <AvatarFallback>
                {userStore.user.name.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </nav>
      <div className="md:hidden">
        <HeaderMenu />
      </div>
    </>
  );
}
