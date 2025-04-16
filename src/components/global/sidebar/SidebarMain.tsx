"use client";

import * as React from "react";
import { SidebarPrimary } from "@/components/global/sidebar/SidebarPrimary";
import { SidebarSecondary } from "@/components/global/sidebar/SidebarSecondary";
import { SidebarUser } from "@/components/global/sidebar/SidebarUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/AuthProvider";
import { sidebarData } from "@/components/global/sidebar/SidebarData";
import { useEffect, useState } from "react";
import { getProfileByUserId, Profile } from "@/services/ProfileService";
import { getOrganisations, Organisation } from "@/services/OrganisationService";
import { SidebarSwitcher } from "@/components/global/sidebar/SidebarSwitcher";
import { SidebarProjects } from "@/components/global/sidebar/SidebarProjects";

export function SidebarMain({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [activeOrganisation, setActiveOrganisation] = useState<Organisation | null>(null);

  const user = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        try {
          const profileData: Profile | null = await getProfileByUserId(user.id);
          if (profileData) {
            setProfile(profileData);
            const organisationsData: Organisation[] = await getOrganisations(
              profileData?.profile_id
            );
            setOrganisations(organisationsData);

            if (organisationsData.length > 0 && !activeOrganisation) {
              setActiveOrganisation(organisationsData[0]);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData();
  }, [user, activeOrganisation]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarSwitcher
          organisations={organisations}
          setActiveOrganisation={(organisation) => {
            const foundOrganisation = organisations.find(
              (org) => org.organisation_id === organisation.organisation_id
            )
            if (foundOrganisation) {
              setActiveOrganisation(foundOrganisation)
            } else {
              setActiveOrganisation(organisation || (organisations.length > 0 ? organisations[0] : null));
            } 
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarPrimary items={sidebarData.primary} />
        <SidebarProjects activeOrganisation={activeOrganisation || null} />
        <SidebarSecondary
          items={sidebarData.secondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser profile={profile} />
      </SidebarFooter>
    </Sidebar>
  );
}
