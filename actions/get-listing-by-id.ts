import axios from "axios";

export const getOneListing = async (listingId: string) => {
  try {
    const { data } = await axios(
      `${process.env.API_URL}api/v1/listing/${listingId}`
    );
    return data.data.data;
  } catch (err) {
    console.log(err);
  }
};
