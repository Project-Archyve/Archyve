import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthSchema } from "@/components/auth/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmail } from "@/app/auth/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthOTPForm from "@/components/auth/AuthOTPForm";

export default function AuthForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof AuthSchema>) => {
    setIsSubmitting(true);
    try {
      await signInWithEmail(data.email);
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
                    <Input placeholder="me@example.com" {...field} required />
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
      ) : (
        <AuthOTPForm email={email} />
      )}
    </>
  );
}
