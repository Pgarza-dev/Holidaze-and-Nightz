"use client";
import { API_BASE_URL, API_LOGIN } from "@/shared/api";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import { formSchema } from "@/app/forms/loginFormSchema";
import { onSubmitAction } from "../forms/formSubmit";
import Link from "next/link";
import useLoginContext from "@/utils/useLoginContext";

function Login() {
  const { setIsLoggedIn } = useLoginContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin() {
    try {
      const response = await fetch(API_BASE_URL + API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   'X-Noroff-API-Key': process.env.NOROFF_API_KEY,
        },
        body: JSON.stringify(form.getValues()),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        return { data, error: null };
        
      } else {
        return { data, error: data };
      }
    } catch (error) {
      return { data: null, error };
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await handleLogin();

    if (error) {
      console.log("Error:", error);
      
      return;
    }
    localStorage.setItem("token", data.data.accessToken);
    console.log("Data:", data);
    setIsLoggedIn(true);
    router.push("/profile");
    console.log(values);
  }
  function ClearForm() {
    form.reset();
  }

  return (
    <Container className=" max-w-xl font-libre">
      <div className="flex flex-row items-center justify-center gap-4 py-4">
        <Link href="/register">
          <h1 className="text-xl font-bold text-customBlack underline-offset-4 hover:underline md:text-2xl lg:text-4xl xl:text-5xl">
            Register
          </h1>
        </Link>
        <span className="text-2xl font-bold text-customBlack md:text-3xl lg:text-5xl xl:text-6xl">
          /
        </span>
        <Link href="/login">
          {typeof window !== "undefined" ? (
            <h1 className="text-xl font-bold text-customBlack underline underline-offset-4 md:text-2xl lg:text-4xl xl:text-5xl">
              Login
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-customBlack underline md:text-2xl lg:text-4xl xl:text-5xl">
              Login
            </h1>
          )}
        </Link>
      </div>
      <p className=" pb-4 text-center text-lg">
        Please enter you email and password to login
      </p>
      <div className="rounded-xl bg-customBlack px-6 py-3 text-customWhite">
        <Form {...form}>
          <form
            // action={onSubmitAction}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      className="bg-customWhite text-lg text-customBlack"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>Your email</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      className="bg-customWhite text-lg text-customBlack"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>Your password</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="border border-customWhite bg-customBlack text-customWhite underline-offset-4 hover:border-customBlack hover:underline"
            >
              Cancel
            </Button>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-customWhite text-xl text-customBlack hover:text-customWhite"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
        <Link href="/register">
          <p className="pt-4 text-xl underline-offset-8 hover:underline">
            Register new account?
          </p>
        </Link>
      </div>
    </Container>
  );
}

export default Login;
