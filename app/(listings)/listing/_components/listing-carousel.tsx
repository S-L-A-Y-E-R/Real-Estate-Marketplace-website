/* eslint-disable @next/next/no-img-element */

import { Carousel } from "@material-tailwind/react";

export function ListingCarousel({
  images,
  userId,
}: {
  images: string[];
  userId: string;
}) {
  return (
    <Carousel
      className="h-[500px]"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {images.map((image) => (
        <img
          key={image}
          src={`${process.env.API_URL}api/v1/listing/${userId}/listing-image/${image}`}
          className="h-full w-full object-cover object-center"
          alt="listing image"
        />
      ))}
    </Carousel>
  );
}
