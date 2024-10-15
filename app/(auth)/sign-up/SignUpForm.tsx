"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/actions";
import { signUpFormSchema } from "@/lib/schema/signUpFormSchema";
import GoogleIcon from "@/public/assets/Google.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Errors {
  [key: string]: string | string[] | undefined;
}
function SignUpForm() {
  const [error, setError] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(value: z.infer<typeof signUpFormSchema>) {
    setIsLoading(true);
    setError({});
    const result = await signUp(value);

    setIsLoading(false);
    if (!result?.success && result?.errors) {
      setError(result?.errors);
    }

    if (result?.success) {
      form.reset();
      router.push("/login");
    }
  }

  return (
    <div className="w-80">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded border border-neutral-black-200 px-6 py-3"
      >
        <span className="size-4">
          <GoogleIcon />
        </span>
        <span>Continue with Google</span>
      </button>

      <div className="my-8 flex items-center gap-4">
        <span className="h-0 flex-grow border"></span>
        <span>OR</span>
        <span className="h-0 flex-grow border"></span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {error && (
            <ul className="flex flex-col gap-2">
              {Object.entries(error).map(([key, value]) => (
                <li key={key} className="text-sm text-red-500">
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="">
                  <Input
                    {...field}
                    className="!mt-0"
                    disabled={isLoading}
                    required
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="!mt-0"
                    disabled={isLoading}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="!mt-0"
                    disabled={isLoading}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-xs font-medium leading-6 text-neutral-black-500">
            By creating an account you agree with our Terms of Service, Privacy
            Policy,
          </p>

          <Button className="h-11 w-full">
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>

      <Link
        href="/login"
        className={`${buttonVariants({ variant: "link" })} mt-5 w-full text-neutral-black-500`}
      >
        Already have an account? Log in
      </Link>
    </div>
  );
}

export default SignUpForm;
