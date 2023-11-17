/* eslint-disable @next/next/no-async-client-component */
"use client";
import { useState, useEffect } from "react";

import { Listing } from "@/types/listingType";
import Header from "@/components/header";
import LandingText from "./_components/landing-text";
import { ListingCarousel } from "./_components/home-slider";
import { getListingOnLoading } from "@/actions/pagination";
import RecentSections from "./_components/recent-sections";
import axios from "axios";

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [recentOffers, setRecentOffers] = useState<Listing[]>([]);
  const [resentPlacesForRent, setResentPlacesForRent] = useState<Listing[]>([]);
  const [resentPlacesForSale, setResentPlacesForSale] = useState<Listing[]>([]);

  useEffect(() => {
    async function fetchListings() {
      const listingsPromise: Promise<Listing[]> = axios.get(
        `${process.env.API_URL}api/v1/listing?page=1&limit=4`
      );

      const recentOffersPromise: Promise<Listing[]> = axios.get(
        `${process.env.API_URL}api/v1/listing?page=1&limit=4&offer=true`
      );
      const resentPlacesForRentPromise: Promise<Listing[]> = axios.get(
        `${process.env.API_URL}api/v1/listing?page=1&limit=4&type=rent`
      );
      const resentPlacesForSalePromise: Promise<Listing[]> = axios.get(
        `${process.env.API_URL}api/v1/listing?page=1&limit=4&type=sell`
      );

      const [
        listings,
        recentOffers,
        resentPlacesForRent,
        resentPlacesForSale,
      ]: any = await Promise.all([
        listingsPromise,
        recentOffersPromise,
        resentPlacesForRentPromise,
        resentPlacesForSalePromise,
      ]);

      setListings(listings.data.data);
      setRecentOffers(recentOffers.data.data);
      setResentPlacesForRent(resentPlacesForRent.data.data);
      setResentPlacesForSale(resentPlacesForSale.data.data);
    }
    fetchListings();
  }, []);

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
