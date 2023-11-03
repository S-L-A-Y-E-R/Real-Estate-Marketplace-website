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

export default function HeaderMenu() {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AiOutlineMenu className="text-2xl md:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {NavLinks.map((link) => (
          <DropdownMenuItem key={link.name}>
            <Link
              href={link.path}
              className={clsx("text-slate-600 hover:text-slate-800", {
                "text-slate-800": pathname === link.path,
              })}
            >
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
