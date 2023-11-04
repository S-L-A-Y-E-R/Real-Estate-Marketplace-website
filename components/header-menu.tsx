import { AiOutlineMenu } from "react-icons/ai";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "./navlinks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/hooks/user-store";

export default function HeaderMenu() {
  const pathname = usePathname();
  const userStore: any = useUserStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AiOutlineMenu className="text-2xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {NavLinks.map((link, i) => (
          <DropdownMenuItem key={i}>
            <Link
              href={link.path}
              className={clsx("text-slate-500 hover:text-slate-950", {
                "text-slate-950": pathname === link.path,
              })}
            >
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <Link
            href={userStore.user ? "/profile" : "/login"}
            className={clsx("text-slate-500 hover:text-slate-950", {
              "text-slate-950": pathname === ("/login" || "profile"),
            })}
          >
            {userStore.user ? "Profile" : "Login"}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
