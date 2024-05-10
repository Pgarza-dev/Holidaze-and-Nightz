"use client";
import { useState } from "react";
import React from "react";
import Container from "@/components/Container";
import { Button } from "../ui/button";

export default function EditProfileForm() {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const [venueManager, setVenueManager] = useState("");

  const handleAvatarChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAvatar(event.target.value);
  };

  const handleBannerChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBanner(event.target.value);
  };

  const handleBioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBio(event.target.value);
  };

  const handleVenueManagerChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setVenueManager(event.target.value);
  };

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
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container className=" max-w-xl font-libre">
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold text-customBlack  md:text-2xl lg:text-4xl xl:text-5xl">
          Edit Profile
        </h1>
      </div>
      <div className=" rounded-xl bg-customBlack px-6 py-3 text-customWhite">
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
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="avatar"
            value={avatar}
            onChange={handleAvatarChange}
            placeholder="Enter your avatar"
          />
          <label htmlFor="banner">Banner</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="banner"
            value={banner}
            onChange={handleBannerChange}
            placeholder="Enter your banner"
          />
          <label htmlFor="venueManager">Venue Manager</label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="venueManager"
            value={venueManager}
            onChange={handleVenueManagerChange}
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
