"use client";
import React from "react";
import { API_VENUES } from "@/shared/ApiEndPoints";
import { createVenueSchema } from "../forms/createVenueScheme";
import { useForm } from "react-hook-form";
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

function CreateVenue() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createVenueSchema>>({
    resolver: zodResolver(createVenueSchema),
    defaultValues: {
      name: "",
      description: "",
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,

      address: "",
      city: "",
      continent: "",
    },
  });

  async function handleCreateVenue() {
    try {
      const response = await fetch(API_VENUES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.getValues()),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Venue Created",
          description: "You have successfully created a venue",
          duration: 3000,
          variant: "default",
          action: (
            <ToastAction altText="Venue created successfully">
              Close
            </ToastAction>
          ),
        });
        console.log("Success:", data);
      }
    } catch (error) {
      toast({
        title: "Venue Creation Failed",
        description: "Please check your form and try again",
        duration: 3000,
        variant: "destructive",
        action: (
          <ToastAction altText="Venue creation failed">Close</ToastAction>
        ),
      });
      console.error("Error:", error);
    }
  }

  function onSubmit(values: z.infer<typeof createVenueSchema>) {
    handleCreateVenue();
    console.log(values);
  }

  function ClearForm() {
    form.reset();
  }

  return (
    <Container className=" max-w-xl font-libre">
      <div className=" py-4">
        <Link href="/profile" className="py-9 text-lg">
          Back to Profile
        </Link>
      </div>
      <div>
        <h1 className="p-4 text-center text-xl uppercase md:text-3xl">
          Lets create a veune!
        </h1>
      </div>
      <div className="rounded-xl bg-customBlack p-4 text-customWhite">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
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
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="media">Media</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https//example.com/image.jpg"
                      {...field}
                      id="media"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Price</FormLabel>
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
                        value={field.value.toString()}
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
                        value={field.value.toString()}
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
                        value={field.value.toString()}
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
                        value={field.value.toString()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <FormControl>
                    <Input {...field} id="address" />
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
                    <Input {...field} id="city" />
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
                    <Input {...field} id="continent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between gap-4 pt-4">
              <Button
                className="text-xl hover:bg-destructive"
                onClick={ClearForm}
              >
                Clear Form
              </Button>
              <Button
                className="border border-customWhite bg-customWhite text-xl text-customBlack hover:border hover:border-customWhite hover:text-customWhite"
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
