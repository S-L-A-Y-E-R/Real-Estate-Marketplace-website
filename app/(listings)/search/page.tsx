"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/header";
import SearchTools from "./_components/seachTools";
import CardGroup from "./_components/card-group";
import { Listing } from "@/types/listingType";
import { getListingOnLoading } from "@/actions/pagination";

export default function SearchPage() {
  const [listings, setListings] = useState<Listing[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const params = useSearchParams();

  useEffect(() => {
    const getListings = async () => {
      setLoading(true);
      try {
        const data = await getListingOnLoading(params, page);
        setListings(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, [page, params]);

  const getListings = (listings: Listing[]) => {
    setListings(listings);
  };

  const pageHandler = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Header />
      <section className="flex md:flex-row flex-col divide-x-2 bg-[#F1F5F1] h-fit min-h-[calc(100vh-80px)]">
        <SearchTools getListings={getListings} />
        {loading && <p className="text-lg p-7">Loading...</p>}
        {!loading && (
          <CardGroup listings={listings || []} paging={pageHandler} />
        )}
      </section>
    </>
  );
}
