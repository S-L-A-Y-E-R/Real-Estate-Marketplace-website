"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import HeaderMenu from "./header-menu";
import { NavLinks } from "./navlinks";

export default function Navbar() {
  const pathname = usePathname();

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
      </nav>
      <div className="md:hidden">
        <HeaderMenu />
      </div>
    </>
  );
}
