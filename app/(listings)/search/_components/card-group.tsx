import { useEffect, useState } from "react";

import ListingCard from "./listing-card";
import { Listing } from "@/types/listingType";
import { getAllListings } from "@/actions/get-all-listings";

export default function CardGroup({
  listings,
  paging,
}: {
  listings: Listing[];
  paging: () => void;
}) {
  const [pages, setPages] = useState<number>();

  useEffect(() => {
    const getListing = async () => {
      const data = await getAllListings();
      setPages(data.results);
    };
    getListing();
  }, []);

  return (
    <section className="p-7 space-y-10">
      <h2 className="text-2xl opacity-80 font-semibold">Listing results:</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {listings.length > 0 &&
          listings.map((listing) => (
            <ListingCard
              key={listing._id}
              name={listing.name}
              address={listing.address}
              description={listing.description}
              price={listing.regularPrice}
              beds={listing.beds}
              baths={listing.baths}
              image={listing.images[0]}
              type={listing.type}
              id={listing._id}
            />
          ))}
        {listings.length === 0 && <p className="">No listings found!</p>}
      </div>
      {listings.length !== pages && (
        <div className="text-center">
          <button className="text-green-900" onClick={() => paging()}>
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
