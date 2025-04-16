import { createClient } from "@/lib/supabase/client";
import { Icon } from "@tabler/icons-react";

export type Organisation = {
  organisation_id: string;
  name: string;
  description: string | null;
  icon: Icon;
};

const supabase = await createClient();

export async function getOrganisations(
  profileId: string
): Promise<Organisation[]> {
  const { data, error } = await supabase
    .from("organisation_profile")
    .select("*")
    .eq("profile_id", profileId);

  if (!data) {
    throw new Error("No data returned from organisation_profile query");
  }

  const organisationsResponse = await supabase
    .from("organisation")
    .select("*")
    .in("organisation_id", data.map((org: Organisation) => org.organisation_id));

  if (error) {
    throw new Error(
      `An error has occured when retrieving organisations: ${error}`
    );
  }

  if (organisationsResponse.error) {
    throw new Error(
      `An error has occured when retrieving organisations: ${organisationsResponse.error.message}`
    );
  }

  return organisationsResponse.data;
}