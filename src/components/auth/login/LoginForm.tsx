"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/components/auth/login/LoginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/app/auth/actions";
import OTPForm from "@/components/auth/otp/OTPForm";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsSubmitting(true);
    try {
      await login(data.email);
      setEmail(data.email);
      setIsOtpSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isOtpSent ? (
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)} 
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="me@example.com" 
                      {...field} 
                      required 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isSubmitting} type="submit">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      ) : <OTPForm email={email} /> }
    </>
  )
};