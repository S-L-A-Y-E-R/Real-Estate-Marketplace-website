"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

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
import GoogleAuth from "@/components/google-auth";

const formSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, { message: "Username must be at least 2 characters." })
      .max(50),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(50),
    passwordConfirm: z
      .string()
      .min(8, { message: "Password Confirm must be at least 8 characters." })
      .max(50),
  })
  .refine((data: any) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export default function SignupForm() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const userStore: any = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        `${process.env.API_URL}api/v1/users/signup`,
        values
      );

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      if (response.status === 201) {
        userStore.setUser({
          id: response.data.data.user._id,
          name: response.data.data.user.username,
          email: response.data.data.user.email,
          photo: `${process.env.API_URL}api/v1/users/get-photo/${response.data.data.user._id}`,
        });
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response.data.message || err.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen flex justify-center bg-[#F1F5F1] h-[calc(100vh-80px)]"
      >
        <div className="space-y-6 w-full px-7 md:px-0 md:w-1/3 translate-y-[5%]">
          <FormDescription className="text-center text-3xl font-bold my-5">
            Sign Up
          </FormDescription>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
                  <Input placeholder="Email" type="email" {...field} />
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
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password Confirm"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <GoogleAuth />
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <div className="text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}
