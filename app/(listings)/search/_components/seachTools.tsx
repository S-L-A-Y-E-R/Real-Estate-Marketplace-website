"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/listingType";
import axios from "axios";

const typeItems = [
  {
    id: "rent&sale",
    label: "Rent & Sale",
  },
  {
    id: "rent",
    label: "Rent",
  },
  {
    id: "sale",
    label: "Sale",
  },
  {
    id: "offer",
    label: "Offer",
  },
] as const;

const amenitiesItems = [
  {
    id: "parking",
    label: "Parking",
  },
  {
    id: "furnished",
    label: "Furnished",
  },
] as const;

const formSchema = z.object({
  term: z.string(),
  typeItems: z.array(z.string()),
  amenitiesItems: z.array(z.string()),
  sort: z.string(),
});

export default function SearchTools({
  getListings,
}: {
  getListings: (listings: Listing[]) => void;
}) {
  let searchParams: any = useSearchParams();
  const { replace } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: searchParams?.get("name") || "",
      typeItems: ["rent&sale"],
      amenitiesItems: [],
      sort: "-createdAt",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    searchParams = {};
    const typesSet = new Set(values.typeItems);
    const set = new Set(values.amenitiesItems);
    values.typeItems = Array.from(typesSet);
    values.amenitiesItems = Array.from(set);
    const params = new URLSearchParams(searchParams);
    values.typeItems = values.typeItems.filter((item) => item !== "rent&sale");

    values.term && params.set("name", values.term);
    values.typeItems.length > 0 &&
      params.set("type", values.typeItems.join(","));
    values.amenitiesItems.forEach((item) => {
      if (item) params.set(item, "true");
    });
    params.set("sort", values.sort);

    try {
      const { data } = await axios.get(
        `${process.env.API_URL}api/v1/listing?${params.toString()}`
      );
      getListings(data.data);
    } catch (e) {
      console.log(e);
    }

    replace(`/search?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-7 basis-1/3 p-7"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-3 items-center">
          <h4>Search Term: </h4>
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="search" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3 items-center">
          <h4>Type: </h4>
          <div className="grid md:grid-cols-4 grid-cols-2 md:gap-y-0 gap-y-3 gap-x-1 md:gap-x-3">
            {typeItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="typeItems"
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
                            if (
                              item.id === "rent&sale" &&
                              checked &&
                              (field.value?.includes("rent") ||
                                field.value?.includes("sale"))
                            ) {
                              field.value = field.value?.filter((value) => {
                                if (value === "rent" || value === "sale")
                                  return false;
                                else return true;
                              });
                            } else if (
                              item.id === "sale" &&
                              checked &&
                              (field.value?.includes("rent&sale") ||
                                field.value?.includes("rent"))
                            ) {
                              field.value = field.value?.filter((value) => {
                                if (value === "rent" || value === "rent&sale")
                                  return false;
                                else return true;
                              });
                            } else if (
                              (field.value?.includes("sale") ||
                                field.value?.includes("rent&sale")) &&
                              checked &&
                              item.id === "rent"
                            ) {
                              field.value = field.value?.filter((value) => {
                                if (value === "sale" || value === "rent&sale")
                                  return false;
                                else return true;
                              });
                            }
                            return checked ||
                              item.id === "sale" ||
                              item.id === "rent" ||
                              item.id === "rent&sale"
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
        </div>
        <div className="flex gap-3 items-center">
          <h4>Amenities: </h4>
          <div className="grid md:grid-cols-4 grid-cols-2 md:gap-y-0 gap-y-5 md:gap-x-16 lg:gap-x-8 gap-x-5">
            {amenitiesItems.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="amenitiesItems"
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
                            return checked
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
        </div>
        <div className="flex gap-3 items-center">
          <h3>Sort: </h3>
          <FormField
            control={form.control}
            name="sort"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="-createdAt">Latest</SelectItem>
                    <SelectItem value="createdAt">Oldest</SelectItem>
                    <SelectItem value="regularPrice">
                      Price low to high
                    </SelectItem>
                    <SelectItem value="-regularPrice">
                      Price high to low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Search
        </Button>
      </form>
    </Form>
  );
}
