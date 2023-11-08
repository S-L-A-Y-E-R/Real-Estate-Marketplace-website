import axios from "axios";
import { ReadonlyURLSearchParams } from "next/dist/client/components/navigation";

export const getListingOnLoading = async (
  params: ReadonlyURLSearchParams,
  page: number
) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_URL}api/v1/listing?name=${params
        .get("name")
        ?.toString()}&page=1&limit=${6 * page}`
    );
    return data.data;
  } catch (e) {
    console.log(e);
  }
};
