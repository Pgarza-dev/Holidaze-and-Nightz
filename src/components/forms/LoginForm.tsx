"use client";
import { useState } from "react";
import React from "react";
import Container from "@/components/Container";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formSchema } from "@/app/formSchemas/loginFormSchema";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const formObject = Object.fromEntries(formData);
      const validated = formSchema.parse(formObject);
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in",
          duration: 3000,
          variant: "success",
          action: <ToastAction altText="Login successful">Close</ToastAction>,
        });
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed",
        description: "Please check if your email and password are correct",
        duration: 5000,
        action: <ToastAction altText="Login failed">Close</ToastAction>,
      });
    }
  }
  return (
    <Container className=" max-w-xl font-libre">
      <div className="text-center">
        <h1 className="text-xl font-bold md:text-2xl lg:text-4xl xl:text-5xl">
          Login
        </h1>
        <p className=" pb-4 text-center text-lg">
          Please enter you email and password to login
        </p>
      </div>
      <div className=" rounded-xl bg-customBlack px-6 py-3 ">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-customWhite" htmlFor="email">
            Email
          </label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          <label className="text-customWhite" htmlFor="password">
            Password
          </label>
          <input
            className="mb-2 h-10 w-full rounded-md p-2"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />

          <Button
            className="border border-customWhite hover:bg-customWhite hover:text-customBlack"
            type="submit"
          >
            Login
          </Button>
        </form>
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <p className="text-customWhite">Don&apos;t have a profile?</p>
          <Link href="/register">
            <Button className="border border-customWhite hover:bg-customWhite hover:text-customBlack">
              Register here
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
