"use client";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import Cookies from "js-cookie";

import { app } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/user-store";

export default function GoogleAuth() {
  const userStore: any = useUserStore();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${process.env.API_URL}api/v1/users/google-login`,
        {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      if (response.status === 200 || response.status === 201) {
        console.log(response.data.data.user);

        userStore.setUser({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          id: response.data.data.user._id,
          name: response.data.data.user.username,
          email: response.data.data.user.email,
          photo: response.data.data.user.photo,
        });
        window.location.assign("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleAuth}
      className="w-full bg-red-500 hover:bg-red-400"
    >
      Continue With Google
    </Button>
  );
}
