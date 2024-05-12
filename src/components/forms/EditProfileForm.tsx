"use client";
import { useState } from "react";
import React from "react";
import Container from "@/components/Container";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EditProfileForm() {
  const [avatar, setAvatar] = useState({ url: "", alt: "" });
  const [banner, setBanner] = useState({ url: "", alt: "" });
  const [bio, setBio] = useState("");
  const [venueManager, setVenueManager] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar((prevState) => ({
      ...prevState,
      url: event.target.value,
      alt: event.target.value,
    }));
  };
  // const handleAvatarDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAvatar((prevState) => ({
  //     ...prevState,
  //     alt: event.target.value,
  //   }));
  // }

  // const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setBanner((prevState) => ({ ...prevState, url: event.target.value }));
  // };

  const handleBioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBio(event.target.value);
  };

  // const handleVenueManagerChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setVenueManager(event.target.checked);
  // };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);

      const response = await fetch("/api/editProfile", {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        window.location.href = "/profile";
      }
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
            value={bio}
            onChange={handleBioChange}
            placeholder="Enter your bio"
          />
          <label htmlFor="avatar">Avatar</label>
          {/* <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="avatar"
            value={avatar.url}
            onChange={handleAvatarChange}
            placeholder="Enter your avatar"
          /> */}
          {/* <label htmlFor="avatar description">Avatar Description</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="avatar"
            value={avatar.alt}
            onChange={handleAvatarDescriptionChange}
            placeholder="Enter your avatar description"
          /> */}
          {/* <label htmlFor="banner">Banner</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="banner"
            value={banner.url} // Access the url property of the banner object
            onChange={handleBannerChange}
            placeholder="Enter your banner"
          /> 
          <label htmlFor="venueManager">Venue Manager</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="venueManager"
            value={venueManager.toString()} // Convert boolean value to string
            onChange={handleVenueManagerChange}
            placeholder="Enter your venue manager"
          />  */}
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
