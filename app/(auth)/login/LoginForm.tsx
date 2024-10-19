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
import { login } from "@/lib/actions";
import { loginFormSchema } from "@/lib/schema/loginFormSchema";
import GoogleIcon from "@/public/assets/Google.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function LoginForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value: z.infer<typeof loginFormSchema>) {
    setError("");

    startTransition(async () => {
      const result = await login(value);

      if (result?.error) {
        setError(result.error);
      } else {
        const session = await getSession();

        if (session?.user) {
          router.push("/dashboard");
        }
      }
    });
  }

  async function handleGoogleSignIn() {
    await startTransition2(() => {
      signIn("google", { redirectTo: "/dashboard" });
    });
  }

  return (
    <div className="w-80">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded border border-neutral-black-200 px-6 py-3"
        onClick={handleGoogleSignIn}
        disabled={isPending2}
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
          {error && <p className="text-sm text-red-500">{error}</p>}

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
                    disabled={isPending}
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
                    disabled={isPending}
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
            {isPending ? "Logging in" : "Login"}
          </Button>
        </form>
      </Form>

      <Link
        href="/sign-up"
        className={`${buttonVariants({ variant: "link" })} mt-5 w-full text-neutral-black-500`}
      >
        Don&apos;t have an account? Sign up
      </Link>
    </div>
  );
}

export default LoginForm;
