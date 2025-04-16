import { createClient } from "@/lib/supabase/client";

export enum ProjectStatus {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETED,
  ARCHIVED
};

export type Project = {
  project_id: string;
  organisation_id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
};

const supabase = await createClient();

export async function getProjects(organisationId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from("project")
    .select("*")
    .eq("organisation_id", organisationId);

  if (error) {
    throw new Error(`An error has occurred when retrieving projects: ${error.message}`);
  }

  return data;
}