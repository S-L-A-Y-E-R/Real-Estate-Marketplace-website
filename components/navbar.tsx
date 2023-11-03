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
        {NavLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={clsx("text-slate-600 hover:text-slate-800", {
              "text-slate-800": pathname === link.path,
            })}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div>
        <HeaderMenu />
      </div>
    </>
  );
}
