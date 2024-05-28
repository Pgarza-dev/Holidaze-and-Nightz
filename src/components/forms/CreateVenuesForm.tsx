"use client";
import React, { useEffect } from "react";
import { API_VENUES } from "@/shared/ApiEndPoints";
import { createVenueSchema } from "@/app/formSchemas/createVenueScheme";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Container from "@/components/Container";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CreateVenueApi = {
  name: string;
  description: string;
  media?: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating?: number;
  meta: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
};

function CreateVenue({ accessToken }: { accessToken: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof createVenueSchema>>({
    resolver: zodResolver(createVenueSchema),
    defaultValues: {
      name: "",
      description: "",
      media: [{ url: "" }],
      price: "",
      maxGuests: "",
      rating: "",
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: "",
      lng: "",
    },
  });

  async function handleCreateVenue(formData: CreateVenueApi) {
    try {
      const response = await fetch(API_VENUES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": process.env.NEXT_PUBLIC_NOROFF_API_KEY || "",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Venue Created",
          description: "You have successfully created a venue",
          duration: 3000,
          variant: "success",
          action: (
            <ToastAction altText="Venue created successfully">
              Close
            </ToastAction>
          ),
        });
        router.push(`/profile`);
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Venue Creation Failed",
        description: "Please check your form and try again",
        duration: 5000,
        variant: "destructive",
        action: (
          <ToastAction altText="Venue creation failed">Close</ToastAction>
        ),
      });
      console.error("Error:", error);
    }
  }

  function onSubmit(values: z.infer<typeof createVenueSchema>) {
    const formData: CreateVenueApi = {
      name: values.name,
      description: values.description,
      meta: {
        wifi: values.wifi,
        parking: values.parking,
        breakfast: values.breakfast,
        pets: values.pets,
      },
      location: {
        address: values.address,
        zip: values.zip,
        city: values.city,
        country: values.country,
        continent: values.continent,
        lat: values.lat ? parseFloat(values.lat) : undefined,
        lng: values.lng ? parseFloat(values.lng) : undefined,
      },
      media: values.media
        ? values.media.map((image) => ({ url: image.url, alt: values.name }))
        : [],
      price: parseFloat(values.price),
      maxGuests: parseInt(values.maxGuests, 10),
      rating: values.rating ? parseFloat(values.rating) : undefined,
    };

    handleCreateVenue(formData);
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "media",
  });

  function ClearForm() {
    form.reset();
  }

  return (
    <Container className=" max-w-2xl font-libre">
      <div className="flex flex-row items-center justify-end gap-4 pb-2">
        <Link href="/">
          <Button className="text-lg" variant="link" size="sm">
            Home
          </Button>
        </Link>
        <Link href="/venues">
          <Button className="text-lg" variant="link" size="sm">
            Venues
          </Button>
        </Link>
        <Link href="/profile">
          <Button className="text-lg" variant="link" size="sm">
            Profile
          </Button>
        </Link>
        <Link href="/editProfile">
          <Button className="text-lg" variant="link" size="sm">
            Edit Profile
          </Button>
        </Link>
      </div>
      <div>
        <h1 className="p-4 text-center text-xl uppercase md:text-3xl">
          Lets create a venue!
        </h1>
      </div>
      <div className="rounded-xl bg-customBlack p-4 text-customWhite">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="text-lg text-customWhite"
                    htmlFor="name"
                  >
                    Name
                  </FormLabel>
                  <FormDescription className="text-customWhite">
                    Please enter the name of the venue
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Venue name"
                      className="text-customWhite"
                      {...field}
                      id="name"
                    />
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
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormDescription className="text-customWhite">
                    Please enter a description of the venue
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Venue description"
                      {...field}
                      id="description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`media.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={`media.${index}`}>
                      Media {index + 1}
                    </FormLabel>
                    <FormDescription className="text-customWhite">
                      Please enter a URL for the venue image
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https//example.com/image.jpg"
                        {...field}
                        value={field.value?.url || ""}
                        defaultValue={field.value?.url || ""}
                        onChange={(e) => {
                          field.onChange({
                            url: e.target.value,
                          });
                        }}
                        id={`media.${index}`}
                      />
                    </FormControl>
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <button type="button" onClick={() => append({ url: "" })}>
              Add Media
            </button>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <FormDescription className="text-customWhite">
                    Please enter the rental price of the venue
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Rental price"
                      {...field}
                      id="price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxGuests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="maxGuests">Max Guests</FormLabel>
                  <FormDescription className="text-customWhite">
                    Please enter the maximum number of guests allowed
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Max guests allowed"
                      {...field}
                      id="maxGuests"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="rating">Rating</FormLabel>
                  <FormDescription className="text-customWhite">
                    Please enter the rating of the venue
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Venue rating"
                      {...field}
                      id="rating"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col py-4">
              <FormDescription className="text-lg text-customWhite">
                Please select the amenities available at the venue
              </FormDescription>{" "}
              <div className=" flex h-full w-full flex-row justify-evenly gap-6 py-4">
                <FormField
                  control={form.control}
                  name="wifi"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-6">
                      <FormLabel htmlFor="wifi">wifi</FormLabel>
                      <FormControl>
                        <Checkbox
                          {...field}
                          id="wifi"
                          className="border border-customWhite bg-customWhite hover:border hover:border-customWhite hover:bg-customBlack hover:text-customWhite"
                          value={field?.value?.toString()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-6">
                      <FormLabel htmlFor="parking">parking</FormLabel>
                      <FormControl>
                        <Checkbox
                          {...field}
                          id="parking"
                          className="border border-customWhite bg-customWhite hover:border hover:border-customWhite hover:bg-customBlack hover:text-customWhite"
                          value={field?.value?.toString()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="breakfast"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-6">
                      <FormLabel htmlFor="breakfast">breakfast</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="border border-customWhite bg-customWhite hover:border hover:border-customWhite hover:bg-customBlack hover:text-customWhite"
                          {...field}
                          id="breakfast"
                          value={field?.value?.toString()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pets"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-6">
                      <FormLabel htmlFor="pets">pets</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="border border-customWhite bg-customWhite hover:border hover:border-customWhite hover:bg-customBlack hover:text-customWhite"
                          {...field}
                          id="pets"
                          value={field?.value?.toString()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Street address"
                      {...field}
                      id="address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="City"
                      {...field}
                      id="city"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="zip">Zip</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Zip code"
                      {...field}
                      id="zip"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="country">Country</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Country"
                      {...field}
                      id="country"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="continent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="continent">Continent</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Country / Continent"
                      {...field}
                      id="continent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between gap-4 pt-4">
              <Button
                className=" hover:bg-destructive"
                onClick={ClearForm}
                size="sm"
              >
                Clear Form
              </Button>
              <Button
                className=" bg-customWhite  text-customBlack hover:bg-green-600 hover:text-customWhite"
                size="sm"
                type="submit"
              >
                Create Venue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Container>
  );
}

export default CreateVenue;
