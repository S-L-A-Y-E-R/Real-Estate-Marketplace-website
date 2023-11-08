import axios from "axios";

export const getAllListings = async () => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}api/v1/listing`);
    return data;
  } catch (e) {
    console.log(e);
  }
};
