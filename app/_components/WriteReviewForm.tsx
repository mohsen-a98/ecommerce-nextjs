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

type ReviewForm = z.infer<typeof writeReviewFormSchema>;
function WriteReviewForm() {
  const { productsId } = useParams();

  const form = useForm<ReviewForm>({
    resolver: zodResolver(writeReviewFormSchema),
    defaultValues: {
      email: "",
      name: "",
      rating: 0,
      review: "",
    },
  });

  async function onSubmit(value: ReviewForm) {
    // Todo: Add userId to review object and send it to server after auth is added

    const review = {
      ...value,
      productId: Number(productsId),
    };
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
                <Input type="text" {...field} />
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
                <Textarea {...field} className="h-32 resize-none" />
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
                <StarRating onRatingChange={field.onChange} />
              </FormControl>
              <FormMessage>{fieldState?.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button className="mt-7 w-full">Submit Your Review</Button>
      </form>
    </Form>
  );
}

export default WriteReviewForm;
