"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthOTPSchema } from "@/components/auth/AuthOTPSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtp } from "@/app/auth/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function AuthOTPForm(props: { email: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof AuthOTPSchema>>({
    resolver: zodResolver(AuthOTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof AuthOTPSchema>) => {
    setIsSubmitting(true);
    try {
      await verifyOtp(props.email, data.pin);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={isSubmitting} type="submit">
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>
    </Form>
  );
}
