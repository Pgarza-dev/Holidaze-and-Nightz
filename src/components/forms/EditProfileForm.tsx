"use client";
import React from "react";
import Container from "@/components/Container";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function EditProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/editProfile", {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: "You have successfully updated your profile",
          duration: 3000,
          variant: "success",
          action: <ToastAction altText="Profile updated">Close</ToastAction>,
        });
      }

      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Profile Update Failed",
        description: "Please check your details and try again",
        duration: 5000,
        variant: "destructive",
        action: (
          <ToastAction altText="Profile update failed">Close</ToastAction>
        ),
      });
    }
  }
  return (
    <Container className=" max-w-xl font-libre">
      <Link href="/profile" className="text-customBlack">
        Back to Profile
      </Link>
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold text-customBlack  md:text-2xl lg:text-4xl xl:text-5xl">
          Edit Profile
        </h1>
      </div>
      <div className=" rounded-xl bg-customBlack px-6 py-3 text-customBlack">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="bio">Bio</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="bio"
            placeholder="Enter your bio"
          />
          <label htmlFor="avatar">Avatar</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="url"
            name="avatarUrl"
            placeholder="Enter your avatar"
          />
          <label htmlFor="avatar description">Avatar Description</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="avatarAlt"
            placeholder="Enter your avatar description"
          />
          <label htmlFor="banner">Banner</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="bannerUrl"
            placeholder="Enter your banner"
          />
          <label htmlFor="avatar description">Banner Description</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="bannerAlt"
            placeholder="Enter your avatar description"
          />

          {/* <div className="flex flex-row items-center gap-4 py-8 text-center text-xl">
            <h3 className="uppercase text-customWhite">VENUE MANAGER?</h3>
            <label htmlFor="venueManager" className="text-customWhite">
              No
            </label>
            <input
              className="h-4 w-4"
              type="radio"
              name="venueManager"
              value="false"
            />
            <label htmlFor="venueManager" className="text-customWhite">
              Yes
            </label>
            <input
              className="h-4 w-4 "
              type="radio"
              name="venueManager"
              value="true"
            />
          </div> */}

          <Button
            className="mt-4 border border-customWhite hover:bg-customWhite hover:text-customBlack"
            type="submit"
          >
            Update Profile
          </Button>
        </form>
      </div>
    </Container>
  );
}
