type User = {
  _id: string;
  photo: string;
  username: string;
};

export interface Listing {
  _id: string;
  name: string;
  description: string;
  address: string;
  images: string[];
  regularPrice: number;
  discountPrice: number;
  beds: number;
  baths: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  user: User;
  createdAt: string;
  updatedAt: string;
}
