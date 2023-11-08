import Link from "next/link";
import React from "react";

export default function LandingText() {
  return (
    <main className="py-24 bg-[#F1F5F1]">
      <div className="container mx-auto space-y-5 px-24">
        <p className="md:text-5xl text-2xl text-[#334155] font-[900]">
          Find your next <span className="text-[#64748B]">perfect</span>
          <br /> place with ease
        </p>
        <p className="text-[#A7A3B5] text-sm">
          Trend Estate will help you find your home fast, easy and comfortable.
          <br />
          Our expert support are always available.
        </p>
        <Link
          href={"/search"}
          className="text-sm font-semibold text-[#1E40AF] block hover:underline"
        >
          Let&apos;s start now...
        </Link>
      </div>
    </main>
  );
}
