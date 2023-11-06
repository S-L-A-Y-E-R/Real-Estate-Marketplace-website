"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";

import { Listing } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/hooks/user-store";
import { getUser } from "@/actions/get-user";
import { User } from "@/lib/types";

const formSchema = z.object({
  username: z.string().trim().max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().max(50).optional(),
});

export default function ProfileForm() {
  const router = useRouter();
  const userStore: any = useUserStore();
  const [userData, setUserData] = useState<User>();
  const [photo, setPhoto] = useState<File>();
  const [photoUrl, setPhotoUrl] = useState<string>();
  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    userName.current!.value = userStore.user.name;
    userEmail.current!.value = userStore.user.email;
    const getListings = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}api/v1/listing?user=${userStore.user.id}`
        );
        console.log(data.data);

        setListings(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getListings();
  }, [userStore.user.email, userStore.user.id, userStore.user.name]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userData?.username,
      email: userData?.email,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      if (values.username) formData.append("username", values.username);
      if (values.email) formData.append("email", values.email);
      if (photo) formData.append("photo", photo);
      if (values.password) formData.append("password", values.password);

      const response = await axios.patch(
        `${process.env.API_URL}api/v1/users/updateMe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        userStore.setUser({
          name: response.data.data.username,
          email: response.data.data.email,
          photo: `${process.env.API_URL}api/v1/users/get-photo/${response.data.data._id}`,
          id: response.data.data._id,
        });
        toast.success("Profile Updated");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.response.data.message || err.message);
    }
  }

  const logoutHandler = () => {
    userStore.logout();
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    router.push("/login");
  };

  const deleteAccountHandler = async () => {
    try {
      await axios.delete(
        `${process.env.API_URL}api/v1/users/${userStore.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      logoutHandler();
      toast.success("Account Deleted");
    } catch (err: any) {
      toast.error(err.response.data.message || err.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen flex justify-center bg-[#F1F5F1] md:h-[calc(100vh-80px)] h-full"
        autoComplete="off"
      >
        <div className="space-y-6 w-full px-7 md:px-0 md:w-1/3 translate-y-[1%]">
          <FormDescription className="text-center text-3xl font-bold my-5">
            Profile
          </FormDescription>
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files![0];
              setPhoto(file);
              setPhotoUrl(URL.createObjectURL(file));
            }}
          />
          <div
            className=" cursor-pointer relative rounded-full w-[100px] h-[100px] mx-auto before:w-full 
          before:h-full before:bg-white before:bg-opacity-0 before:absolute before:top-0
           before:rounded-full z-10 hover:before:bg-opacity-20"
            onClick={() => fileRef.current?.click()}
          >
            <Image
              src={photoUrl || userStore.user?.photo || "/public/default.jpeg"}
              alt="profile picture"
              width={100}
              height={100}
              className="rounded-full w-full h-full object-contain -z-20 absolute"
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} ref={userName} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    ref={userEmail}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    autoComplete="new-password"
                    role="presentation"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Update
          </Button>

          <Button
            type="button"
            className="w-full bg-green-700 hover:bg-green-500"
          >
            <Link href="/create-listing">Create Listing</Link>
          </Button>
          <div className="flex justify-between">
            <Button
              type="button"
              className="text-red-500 bg-transparent hover:bg-transparent"
              onClick={deleteAccountHandler}
            >
              Delete Account
            </Button>
            <Button
              type="button"
              className="text-red-500 bg-transparent hover:bg-transparent"
              onClick={logoutHandler}
            >
              Sign Out
            </Button>
          </div>
          <Button
            type="button"
            className=" bg-transparent text-green-500 mx-auto hover:bg-transparent block"
          >
            Show Listing
          </Button>
        </div>
      </form>
    </Form>
  );
}
