import { createClient } from "@/lib/supabase/client";

export type Profile = {
  profile_id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
};

const supabase = await createClient();

export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile by User ID:", error);
    return null;
  }

  return data;
}

export async function getProfileById(profileId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("profile_id", profileId)
    .single();

  if (error) {
    console.error("Error fetching profile by ID:", error);
    return null;
  }

  return data;
}