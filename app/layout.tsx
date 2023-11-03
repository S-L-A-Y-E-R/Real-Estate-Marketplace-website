import type { Metadata } from "next";
import { inter } from "@/components/ui/fonts";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "Real Estate Marketplace",
  description: "Real Estate Marketplace website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
