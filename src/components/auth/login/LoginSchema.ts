import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Your email must be a valid email address."
  }),
});