export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  photo: string;
  _id: string;
  __v: number;
}

export interface Listing {
  listingName: string;
  images: string[];
}
