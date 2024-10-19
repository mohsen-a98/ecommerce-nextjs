"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPassword } from "@/lib/actions";
import { createPasswordFormSchema } from "@/lib/schema/changePasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

function CreatePassword() {
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const session = useSession();
  const userId = session.data?.user?.id;

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof createPasswordFormSchema>>({
    resolver: zodResolver(createPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createPasswordFormSchema>) {
    await startTransition(async () => {
      const result = await createPassword(values, parseInt(userId));

      if (!result.success && result.errors) {
        if (typeof result.errors === "string") {
          toast.error(result.errors);
        }

        if (typeof result.errors === "object" && result.errors !== null) {
          Object.keys(result.errors).forEach((key) => {
            const typedKey = key as keyof typeof result.errors;
            form.setError(typedKey, {
              type: "custom",
              message: (result.errors as { [key: string]: string[] })[
                typedKey
              ]?.[0],
            });
          });
        }
      }

      if (result.success) {
        toast.success("Password created successfully");
        form.reset();
        router.refresh();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-body font-medium text-neutral-black-600">
                New Password
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type={showPassword.newPassword ? "text" : "password"}
                    {...field}
                    className="!mt-0"
                    disabled={isPending}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        newPassword: !showPassword.newPassword,
                      })
                    }
                  >
                    {showPassword.newPassword ? (
                      <EyeOff className="size-5 text-neutral-black-600" />
                    ) : (
                      <Eye className="size-5 text-neutral-black-600" />
                    )}
                  </span>
                </div>
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
              <FormLabel className="text-body font-medium text-neutral-black-600">
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    {...field}
                    className="!mt-0"
                    disabled={isPending}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirmPassword: !showPassword.confirmPassword,
                      })
                    }
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff className="size-5 text-neutral-black-600" />
                    ) : (
                      <Eye className="size-5 text-neutral-black-600" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="!mt-16" disabled={isPending} type="submit">
          Create Password
        </Button>
      </form>
    </Form>
  );
}

export default CreatePassword;
