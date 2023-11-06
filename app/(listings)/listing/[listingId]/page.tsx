"use client";

import Header from "@/components/header";
import { ListingCarousel } from "../_components/listing-carousel";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import { Listing } from "@/types/listingType";
import { useUserStore } from "@/hooks/user-store";
import ListingDetails from "../_components/listing-details";

export default function ListingPage() {
  const params = useParams();
  const [listing, setListing] = useState<Listing>();
  const userStore: any = useUserStore();

  useEffect(() => {
    const getOneListing = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}api/v1/listing/${params.listingId}`
        );
        setListing(data.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOneListing();
  }, [params.listingId]);

  return (
    <>
      <Header />
      <ListingCarousel
        images={listing?.images ? listing.images : []}
        userId={userStore.user.id}
      />
      <ListingDetails listing={listing!} />
    </>
  );
}
