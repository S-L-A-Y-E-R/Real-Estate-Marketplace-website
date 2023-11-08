/* eslint-disable @next/next/no-async-client-component */
"use client";

import { Listing } from "@/types/listingType";
import Header from "@/components/header";
import LandingText from "./_components/landing-text";
import { ListingCarousel } from "./_components/home-slider";
import { getListingOnLoading } from "@/actions/pagination";
import RecentSections from "./_components/recent-sections";

export default async function Home() {
  const listingsPromise: Promise<Listing[]> = getListingOnLoading(1, 4);
  const recentOffersPromise: Promise<Listing[]> = getListingOnLoading(
    1,
    4,
    "offer=true"
  );
  const resentPlacesForRentPromise: Promise<Listing[]> = getListingOnLoading(
    1,
    4,
    "type=rent"
  );
  const resentPlacesForSalePromise: Promise<Listing[]> = getListingOnLoading(
    1,
    4,
    "type=sell"
  );

  const [listings, recentOffers, resentPlacesForRent, resentPlacesForSale] =
    await Promise.all([
      listingsPromise,
      recentOffersPromise,
      resentPlacesForRentPromise,
      resentPlacesForSalePromise,
    ]);

  return (
    <>
      <Header />
      <LandingText />
      <ListingCarousel listings={listings} />
      <RecentSections
        listings={recentOffers}
        headerText={"offers"}
        query={"offer=true"}
      />
      <RecentSections
        listings={resentPlacesForRent}
        headerText={"places for rent"}
        query={"type=rent"}
      />
      <RecentSections
        listings={resentPlacesForSale}
        headerText={"places for sale"}
        query={"type=sell"}
      />
    </>
  );
}
