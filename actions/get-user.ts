import axios from "axios";
import Cookies from "js-cookie";

export const getUser = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}api/v1/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      cache: "no-store",
    });

    if (response.status === 401) {
      const { data } = await axios.post(
        `${process.env.API_URL}api/v1/users/refresh-token`,
        Cookies.get("refreshToken")
      );

      Cookies.set("accessToken", data.accessToken);
    }

    const data = await response.json();

    return data.data.data;
  } catch (err) {
    console.log(err);
  }
};
