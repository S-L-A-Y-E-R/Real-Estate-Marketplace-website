"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/hooks/user-store";

const items = [
  {
    id: "sell",
    label: "Sell",
  },
  {
    id: "rent",
    label: "Rent",
  },
  {
    id: "parking spot",
    label: "Parking spot",
  },
  {
    id: "offer",
    label: "Offer",
  },
  {
    id: "furnished",
    label: "Furnished",
  },
] as const;

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Listing name must be at least 2 characters." })
    .max(50),
  description: z.string().min(2, {
    message: "Listing description must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Listing address must be at least 2 characters.",
  }),
  beds: z.string().max(10),
  baths: z.string().max(10),
  regularPrice: z.string(),
  discountPrice: z.string().optional(),
  items: z.array(z.string()),
});

export default function CreateListingForm() {
  const userStore: any = useUserStore();
  const [discountPriceField, setDiscountPrice] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      beds: "1",
      baths: "1",
      regularPrice: "10",
      discountPrice: "0",
      items: ["rent"],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const set = new Set(values.items);
    values.items = Array.from(set);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("address", values.address);
    formData.append("beds", values.beds.toString());
    formData.append("baths", values.baths.toString());
    formData.append("regularPrice", values.regularPrice.toString());
    formData.append("discountPrice", values.discountPrice!.toString());
    formData.append("user", userStore.user.id);
    values.items.forEach((item) => {
      if (item === "sell") formData.append("type", "sell");
      else if (item === "rent") formData.append("type", "rent");
      else formData.append(item, "true");
    });
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        `${process.env.API_URL}api/v1/listing`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === 401) {
        const { data } = await axios.post(
          `${process.env.API_URL}api/v1/users/refresh-token`,
          Cookies.get("refreshToken")
        );

        Cookies.set("accessToken", data.accessToken);
      }
      toast.success("Listing created successfully.");
    } catch (err: any) {
      console.log(err.response.data.message || err.message);

      toast.error(err.response.data.message || err.message);
    }
  }

  return (
    <>
      <h1 className="text-3xl opacity-80 font-bold text-center my-7">
        Create a Listing
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-screen flex flex-col md:flex-row md:px-0 px-7 justify-center gap-7 bg-[#F1F5F1] md:h-[calc(75vh)]"
        >
          <div className="space-y-6  ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      placeholder="Description"
                      {...field}
                      className="w-full p-3 rounded-md placeholder:opacity-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-y-5 md:gap-x-3 gap-x-3">
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              if (item.id === "offer" && checked) {
                                setDiscountPrice(true);
                              } else if (item.id === "offer" && !checked) {
                                setDiscountPrice(false);
                              }
                              if (
                                item.id === "sell" &&
                                checked &&
                                field.value?.includes("rent")
                              ) {
                                field.value = field.value?.filter(
                                  (value) => value !== "rent"
                                );
                              } else if (
                                field.value?.includes("sell") &&
                                checked &&
                                item.id === "rent"
                              ) {
                                field.value = field.value?.filter(
                                  (value) => value !== "sell"
                                );
                              }

                              return checked ||
                                item.id === "sell" ||
                                item.id === "rent"
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem className="flex gap-3">
                    <FormControl>
                      <Input type="number" min={1} max={10} {...field} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Beds</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="baths"
                render={({ field }) => (
                  <FormItem className="flex gap-3">
                    <FormControl>
                      <Input type="number" min={1} max={10} {...field} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Baths</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="regularPrice"
              render={({ field }) => (
                <FormItem className="flex gap-3">
                  <FormControl>
                    <Input type="number" min={0} {...field} className="w-1/3" />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Regular price
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {discountPriceField && (
              <FormField
                control={form.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem className="flex gap-3">
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        className="w-1/3"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Discounted price
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <p>
                <span className="font-bold">Images</span>:{" "}
                <span className="opacity-80">
                  The first image will be the cover (max 6)
                </span>
              </p>
              <div className="border border-gray-300 p-3 rounded-sm">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files?.length === 1) {
                      const file = e.target.files![0];
                      setImages([...images, file]);
                    } else {
                      const files = Array.from(e.target.files!);
                      setImages([...images, ...files]);
                    }
                  }}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create Listing
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
