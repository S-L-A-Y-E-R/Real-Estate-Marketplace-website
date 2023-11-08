import Link from "next/link";

import { Listing } from "@/types/listingType";
import ListingCard from "./listing-card";

export default function RecentSections({
  headerText,
  listings,
  query,
}: {
  headerText: string;
  listings: Listing[];
  query: string;
}) {
  return (
    <main className="text-[#FFFFFF] py-14">
      <div className="container mx-auto px-24">
        <h3 className="text-xl text-[#47557F] font-semibold">
          Recent {headerText}
        </h3>
        <Link
          href={`/search?${query}`}
          className="text-blue-600 text-[12px] hover:underline block"
        >
          Show more {headerText}
        </Link>
        <div className="mt-5 flex flex-wrap gap-10">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </main>
  );
}
