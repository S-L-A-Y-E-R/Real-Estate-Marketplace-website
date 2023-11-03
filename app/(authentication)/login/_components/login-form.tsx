"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50),
});

export default function LoginForm() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        `${process.env.API_URL}api/v1/users/login`,
        values
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err: any) {
      console.log(err);

      setError(err.response.data.message);
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
            Sign In
          </FormDescription>
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
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <Button type="button" className="w-full bg-red-500 hover:bg-red-400">
            Continue With Google
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="text-center">
            <p className="text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}