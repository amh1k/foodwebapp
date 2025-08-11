"use client";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { loginUser } from "@/api/auth";

export const SigninView = () => {
  const router = useRouter();
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      router.push("/food");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    mutate(values);
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
                Good to see you again!
              </h1>
              <p className="mt-2 text-gray-600 text-base lg:text-lg">
                Welcome back! Please sign in to continue exploring amazing
                features and stay connected with us.
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

            {/* Submit Button */}
            <Button type="submit" size="lg" className="bg-amber-600">
              Sign in
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-amber-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </Form>
      </div>

      {/* Image Section */}
      <div
        className=" h-scraeen w-full lg:col-span-2 hidden lg:block  overflow-hidden rounded-l-[50%]"
        style={{
          backgroundImage: "url('/food.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};
