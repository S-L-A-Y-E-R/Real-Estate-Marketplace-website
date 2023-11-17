"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MapIcon } from "lucide-react";
import { Listing } from "@/types/listingType";

export default function ListingCard({ listing }: { listing: Listing }) {
  const { push } = useRouter();

  return (
    <Card
      className="shadow-md hover:cursor-pointer hover:shadow-xl transition-all
       group overflow-hidden duration-300  sm:basis-1/2 md:basis-2/5 lg:basis-1/4"
      onClick={() => push(`/listing/${listing._id}`)}
    >
      <CardHeader className="p-0">
        <Image
          src={`${process.env.API_URL}api/v1/listing/654834b145050d71d4a9a3d7/listing-image/${listing.images[0]}`}
          alt="listing image"
          height={150}
          width={150}
          className=" object-contain w-full h-full rounded-t-md group-hover:scale-105 transition-all duration-300"
        />
      </CardHeader>
      <CardContent className="p-3 space-y-5">
        <p className="font-semibold capitalize">{listing.name}</p>
        <div className="flex gap-1 text-sm">
          <MapIcon size={20} />
          {listing.address}
        </div>
        <p className=" line-clamp-2">{listing.description}</p>
        <p className=" text-gray-500  text-sm">
          $ {listing.regularPrice}
          {listing.type === "rent" && "/ Month"}
        </p>
      </CardContent>
      <CardFooter className="p-3 flex gap-3  text-sm">
        <p>{listing.beds} Bed</p>
        <p>{listing.baths} Bath</p>
      </CardFooter>
    </Card>
  );
}
