"use client";

import { BiSearch } from "react-icons/bi";
import { FormEvent } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Navbar from "./navbar";
import Link from "next/link";

export default function Header() {
  const searchRef = useRef<HTMLInputElement>(null);
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const searchHandler = async (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (searchRef.current?.value) {
      params.set("name", searchRef.current.value);
    } else {
      params.delete("name");
    }

    replace(`/search?${params.toString()}`);
  };

  return (
    <header className="bg-[#E2E8F0] shadow-xl py-5">
      <div className="container flex justify-between items-center gap-4 mx-auto md:px-24">
        <Link href="/">
          <span className="font-semibold text-[#64748B] md:text-2xl">
            Trend
          </span>
          <span className="font-semibold text-[#334155] md:text-2xl">
            Estate
          </span>
        </Link>
        <form onSubmit={searchHandler}>
          <div className="flex items-center bg-[#F1F5F9] pr-3 rounded-lg">
            <input
              type="search"
              placeholder="Search..."
              name="search"
              className="outline-none bg-transparent py-2 px-3 w-24 md:w-full text-sm md:text-base"
              ref={searchRef}
              defaultValue={searchParams.get("name")?.toString()}
            />
            <button type="submit">
              <BiSearch className="text-lg" />
            </button>
          </div>
        </form>
        <Navbar />
      </div>
    </header>
  );
}
