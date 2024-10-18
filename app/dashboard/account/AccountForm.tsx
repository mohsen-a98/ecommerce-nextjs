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
import { updateAccount } from "@/lib/actions";
import { accountFormSchema } from "@/lib/schema/accountFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

function AccountForm() {
  const { data: session, update } = useSession();
  const userId = session?.user?.id;
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: session?.user?.name,
      email: session?.user?.email,
    },
  });

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    await startTransition(async () => {
      const result = await updateAccount(parseInt(userId), values);

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

      if (result.success && result.user) {
        toast.success("Account updated successfully");

        await update({
          ...session,
          user: {
            ...session?.user,
            name: result.user.name,
            email: result.user.email,
          },
        });

        form.reset({
          name: result.user.name,
          email: result.user.email,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="!mt-0"
                  disabled={isPending}
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
                  type="email"
                  {...field}
                  className="!mt-0"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="!mt-12" disabled={isPending}>
          {isPending ? "Saving..." : "Save Change"}
        </Button>
      </form>
    </Form>
  );
}

export default AccountForm;
