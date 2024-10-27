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
import { changePassword } from "@/lib/actions";
import { changePasswordFormSchema } from "@/lib/schema/changePasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    const session = await getSession();
    if (!session) {
      router.push("/login");
      toast.error(
        "Your session has expired. Please sign in again to continue.",
      );
      return null;
    }
    const userId = session.user?.id;

    await startTransition(async () => {
      const result = await changePassword(values, parseInt(userId));

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
        toast.success("Password changed successfully");
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-body font-medium text-neutral-black-600">
                Old Password
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type={showPassword.oldPassword ? "text" : "password"}
                    {...field}
                    className="!mt-0"
                    disabled={isPending}
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        oldPassword: !showPassword.oldPassword,
                      })
                    }
                  >
                    {showPassword.oldPassword ? (
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
          Change Password
        </Button>
      </form>
    </Form>
  );
}

export default ChangePasswordForm;
