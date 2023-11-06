import { Listing } from "@/types/listingType";
import { Bath, Bed, MapIcon, ParkingSquareIcon, Table } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/user-store";

import { useState } from "react";
import Link from "next/link";

export default function ListingDetails({ listing }: { listing: Listing }) {
  const [openForm, setOpenForm] = useState(false);
  const [message, setMessage] = useState("");
  const userStore: any = useUserStore();

  return (
    <main className=" px-7 md:p-0 bg-[#F1F5F1]">
      <section className="w-full md:w-1/2 mx-auto py-7 space-y-6 text-center md:text-left">
        <h3 className="text-2xl font-semibold capitalize">
          {listing?.name} - ${listing?.regularPrice}
        </h3>
        <div className="flex justify-center md:justify-start gap-1 text-green-900">
          <MapIcon />
          <span>{listing?.address}</span>
        </div>
        <Badge className="bg-red-900 text-white capitalize">
          For {listing?.type}
        </Badge>
        <div>
          <span className="font-bold">Description</span> -{" "}
          {listing?.description}
        </div>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <div className="text-green-900 flex">
            <Bed size={20} className="mr-2" /> {listing?.beds} beds
          </div>
          <div className="text-green-900 flex">
            <Bath size={20} className="mr-2" /> {listing?.baths} baths
          </div>
          <div className="text-green-900 flex">
            <ParkingSquareIcon size={20} className="mr-2" />{" "}
            {`${
              listing?.parking ? "Parking Available" : "No Parking Available"
            }`}
          </div>
          <div className="text-green-900 flex">
            <Table size={20} className="mr-2" />{" "}
            {`${listing?.furnished ? "Furnished" : "Not Furnished"}`}
          </div>
        </div>
        {!openForm && listing?.user?._id !== userStore.user.id && (
          <Button className="w-full" onClick={() => setOpenForm(true)}>
            Contact Landlord
          </Button>
        )}
        {openForm && (
          <form className="space-y-6">
            <textarea
              className="w-full rounded-md h-32 p-3"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button className="w-full">
              <Link
                href={`mailto:${listing?.user?.username}?subject=Regarding${listing?.name}&body=${message}`}
              >
                Send Message
              </Link>
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
