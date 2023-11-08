import axios from "axios";

export const getListingOnLoading = async (
  page: number,
  limit?: number,
  query?: string
) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_URL}api/v1/listing?page=1&limit=${
        (limit || 6) * page
      }${query && `&${query}`}`
    );
    return data.data;
  } catch (e) {
    console.log(e);
  }
};
