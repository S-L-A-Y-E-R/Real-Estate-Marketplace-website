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

export default function ListingCard({
  name,
  description,
  address,
  price,
  beds,
  baths,
  image,
  type,
  id,
}: {
  name: string;
  description: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  image: string;
  type: string;
  id: string;
}) {
  const { push } = useRouter();

  return (
    <Card
      className="shadow-md hover:cursor-pointer hover:shadow-xl transition-all group overflow-hidden duration-300"
      onClick={() => push(`/listing/${id}`)}
    >
      <CardHeader className="p-0">
        <Image
          src={`${process.env.API_URL}api/v1/listing/654834b145050d71d4a9a3d7/listing-image/${image}`}
          alt="listing image"
          height={150}
          width={150}
          className=" object-contain w-full h-full rounded-t-md group-hover:scale-105 transition-all duration-300"
        />
      </CardHeader>
      <CardContent className="p-3 space-y-5">
        <p className="font-semibold capitalize">{name}</p>
        <div className="flex gap-1 text-sm">
          <MapIcon size={20} />
          {address}
        </div>
        <p className=" line-clamp-2">{description}</p>
        <p className=" text-gray-500  text-sm">
          $ {price}
          {type === "rent" && "/ Month"}
        </p>
      </CardContent>
      <CardFooter className="p-3 flex gap-3  text-sm">
        <p>{beds} Bed</p>
        <p>{baths} Bath</p>
      </CardFooter>
    </Card>
  );
}
