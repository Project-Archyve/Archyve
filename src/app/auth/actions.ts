'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email, 
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    redirect('/error')
  }
}

export async function verifyOtp(
  email: string, 
  token: string
) {
  const supabase = await createClient();
  await supabase.auth.verifyOtp({
    email: email, token: token, type: "email"
  });

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth/login");
};