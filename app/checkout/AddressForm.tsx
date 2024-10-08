"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkout, createAddress } from "@/lib/actions";
import { addressFormSchema } from "@/lib/schema/AddressFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCart } from "../_context/cartContext/cartProvider";

interface Errors {
  [key: string]: string | string[] | undefined;
}
function AddressForm({ address }: { address: Address | undefined }) {
  const session = useSession();
  const router = useRouter();

  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const orderItems = cart.map((item) => ({
    quantity: item.quantity,
    productId: item.id,
  }));

  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Errors>({});

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      streetAddress: address?.street || "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      zipCode: address?.zipCode ?? "",
      country: address?.country ?? "",
    },
  });

  async function onSubmit(formData: z.infer<typeof addressFormSchema>) {
    setErrors({});
    startTransition(async () => {
      const resultAddress = await createAddress(
        formData,
        Number(session.data?.user?.id),
      );

      if (!resultAddress?.success && resultAddress?.errors) {
        setErrors(resultAddress?.errors);
      }

      if (resultAddress?.success && resultAddress?.address) {
        const resultCheckout = await checkout(
          {
            totalPrice: totalPrice,
            addressId: resultAddress?.address?.id,
            userId: Number(session.data?.user?.id),
          },
          orderItems,
        );

        if (!resultCheckout?.success) {
          router.push("/checkout/failed");
        }

        if (resultCheckout?.success) {
          form.reset();
          localStorage.removeItem("cart");
          router.push("/checkout/successful");
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
        id="address-form"
      >
        <FormField
          name="streetAddress"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  defaultValue={address?.street}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  defaultValue={address?.city}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="state"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  defaultValue={address?.state}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="zipCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  defaultValue={address?.zipCode && parseInt(address?.zipCode)}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="country"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  defaultValue={address?.country}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors && (
          <ul className="mt-2 flex flex-col gap-2 text-sm text-red-500">
            {Object.entries(errors).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        )}
      </form>
    </Form>
  );
}

export default AddressForm;
