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
import { Textarea } from "@/components/ui/textarea";
import { writeReviewFormSchema } from "@/lib/schema/writeReviewFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import StarRating from "./StarRating";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { addReview } from "@/lib/actions";
import { useState, useTransition } from "react";

type ReviewForm = z.infer<typeof writeReviewFormSchema>;
type Errors = { [key: string]: string | string[] | undefined };

function WriteReviewForm({ onClose }: { onClose: () => void }) {
  const session = useSession();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Errors>({});
  const { productsId } = useParams();

  const form = useForm<ReviewForm>({
    resolver: zodResolver(writeReviewFormSchema),
    defaultValues: {
      email: session.data?.user?.email || "",
      name: "",
      rating: 0,
      review: "",
    },
  });

  async function onSubmit(value: ReviewForm) {
    const review = {
      ...value,
      productId: Number(productsId),
      userId: Number(session.data?.user?.id),
    };

    startTransition(async () => {
      const result = await addReview(review);

      if (!result.success && result.errors) {
        setErrors(result.errors);
      }

      if (result?.success) {
        form.reset();
        onClose();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {errors && (
          <ul className="flex flex-col gap-2">
            {Object.entries(errors).map(([key, value]) => (
              <li key={key} className="text-sm text-red-500">
                <span>{value}</span>
              </li>
            ))}
          </ul>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input type="text" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="review"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-32 resize-none"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          name="rating"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <StarRating
                  onRatingChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage>{fieldState?.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button className="mt-7 w-full">
          {isPending ? "Submitting..." : "Submit Your Review"}
        </Button>
      </form>
    </Form>
  );
}

export default WriteReviewForm;
