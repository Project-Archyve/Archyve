import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signInWithEmail = async (email: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "http://localhost:3000/dashboard",
    },
  });

  if (error) redirect("/error");
};

export const verifyOtp = async (email: string, token: string) => {
  const supabase = await createClient();

  await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "email",
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
};

export const signOut = async () => {
  const supabase = await createClient();

  await supabase.auth.signOut();
  return redirect("/auth");
};
