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
    const data = await response.json();

    return data.data.data;
  } catch (err) {
    console.log(err);
  }
};
