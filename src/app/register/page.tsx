"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { API_BASE_URL, API_REGISTER } from "@/shared/ApiEndPoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import { registerSchema } from "@/app/formSchemas/registerFormSchema";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      venueManager: false,
    },
  });

  async function handleRegister() {
    try {
      const response = await fetch(API_BASE_URL + API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.getValues()),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Account Created",
          description: "You have successfully created an account",
          duration: 3000,
          variant: "default",
          action: (
            <ToastAction altText="Register successful">Close</ToastAction>
          ),
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Oops something went wrong!",
        description: "Please try again",
        duration: 5000,
        variant: "destructive",
        action: (
          <ToastAction altText="Register unsuccessful">Close</ToastAction>
        ),
      });
    }
  }

  function onSubmit(values: z.infer<typeof registerSchema>) {
    handleRegister();
  }

  function ClearForm() {
    form.reset();
  }

  return (
    <Container className=" max-w-xl  font-libre">
      <div className="flex flex-row items-center justify-center gap-4 py-4">
        <Link href="/register">
          {typeof window !== "undefined" ? (
            <h1 className="text-xl font-bold text-customBlack underline underline-offset-4 md:text-2xl lg:text-4xl xl:text-5xl">
              Register
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-customBlack md:text-2xl lg:text-4xl xl:text-5xl">
              Register
            </h1>
          )}
        </Link>
        <span className="text-2xl font-bold text-customBlack md:text-3xl lg:text-5xl xl:text-6xl">
          /
        </span>
        <Link href="/login">
          <h1 className="text-xl font-bold text-customBlack underline-offset-4 hover:underline md:text-2xl lg:text-4xl xl:text-5xl">
            Login
          </h1>
        </Link>
      </div>
      <p className=" pb-4 text-center text-lg">
        Get started by Registering a new account today. If you would like to
        register as a Venue Manager, please click the checkbox below!
      </p>

      <div className="rounded-xl bg-customBlack px-6 py-3 text-customWhite">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="must be at least 2 characters"
                      className="bg-customWhite text-lg text-customBlack"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="must be a @stud.noroff.no"
                      className="bg-customWhite text-lg text-customBlack"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your email must be a @stud.noroff.no
                  </FormDescription>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirm password"
                      type="password"
                      className="bg-customWhite text-lg text-customBlack"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venueManager"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-customWhite bg-customWhite"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-lg">Venue manager</FormLabel>
                    <FormDescription className="text-base">
                      By clicking you agree to register a a Venue Manager
                      <Link href="/examples/forms">mobile settings</Link> page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button
              onClick={ClearForm}
              type="button"
              className="border border-customWhite bg-customBlack text-customWhite underline-offset-4 hover:border-customBlack hover:underline"
            >
              Cancel
            </Button>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  if (form.formState.isValid) {
                    // onSubmit(form.getValues())
                    router.push("/");
                    toast({
                      title: "Account Created",
                      description: "You have successfully created an account",
                      duration: 3000,
                      action: (
                        <ToastAction altText="Register successful">
                          Close
                        </ToastAction>
                      ),
                    });
                  } else {
                    toast({
                      title: "Oops something went wrong!",
                      description: "Please try again",
                      duration: 3000,
                      action: (
                        <ToastAction altText="Register unsuccessful">
                          Close
                        </ToastAction>
                      ),
                    });
                  }
                }}
                type="submit"
                className="bg-customWhite text-xl text-customBlack hover:text-customWhite"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
        <Link href="/login">
          <p className="pt-4 text-xl underline-offset-8 hover:underline">
            Already have an account?
          </p>
        </Link>
      </div>
    </Container>
  );
}

export default Register;
