"use client";
import z from "zod";
import { registerSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUser } from "@/api/auth";

export const SignupView = () => {
  const router = useRouter();
  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
      router.push("/food");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      {/* Form Section */}
      <div className="h-screen w-full lg:col-span-3 flex flex-col justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-6 lg:p-16 max-w-2xl w-full mx-auto shadow-2xl"
          >
            {/* Heading & Subheading */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Join us today!
              </h1>
              <p className="mt-2 text-gray-600 text-base lg:text-lg">
                Create your account to start your journey with us. Enjoy
                exclusive features, stay connected, and make the most out of
                your experience.
              </p>
            </div>

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" size="lg" className="bg-amber-600">
              Sign up
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-amber-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>

      {/* Image Section */}
      <div
        className=" h-scraeen w-full lg:col-span-2 hidden lg:block rounded-l-[50%] overflow-hidden"
        style={{
          backgroundImage: "url('/food.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};
