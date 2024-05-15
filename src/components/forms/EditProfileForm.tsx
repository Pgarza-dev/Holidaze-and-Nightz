"use client";
import React from "react";
import Container from "@/components/Container";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditProfileForm() {
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      console.log(formData);
      const response = await fetch("/api/editProfile", {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      
      router.push("/profile");
      console.log(data);
    } catch (error) {
      console.log(error);
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
          <label htmlFor="venueManager">Venue Manager</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="radio"
            name="venueManager"
            value="false"
            placeholder="Enter your venue manager"
          />
          <label htmlFor="venueManager">Not a Venue Manager</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="radio"
            name="venueManager"
            value="true"
            placeholder="Enter your venue manager"
          />
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
