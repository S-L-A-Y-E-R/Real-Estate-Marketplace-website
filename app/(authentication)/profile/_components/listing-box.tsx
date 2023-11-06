import Image from "next/image";
import Link from "next/link";

export default function ListingBox({
  listingName,
  listingImage,
  userId,
  listingId,
  handleDeleteListing,
}: {
  listingName: string;
  listingImage: string[];
  userId: string;
  listingId: string;
  handleDeleteListing: (id: string) => void;
}) {
  const deleteListing = () => {
    handleDeleteListing(listingId);
  };

  return (
    <div className="border p-5 flex justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={`${process.env.API_URL}api/v1/listing/${userId}/listing-image/${listingImage[0]}`}
          width={80}
          height={80}
          alt="listing image"
          className="object-contain"
        />
        <p className="font-bold">{listingName}</p>
      </div>
      <div className="flex flex-col">
        <button
          className="bg-transparent text-red-500 hover:text-red-300"
          onClick={deleteListing}
        >
          Delete
        </button>
        <button className="bg-transparent text-green-500 hover:text-green-300">
          <Link href={`/edit-listing/${listingId}`}>Edit</Link>
        </button>
      </div>
    </div>
  );
}
