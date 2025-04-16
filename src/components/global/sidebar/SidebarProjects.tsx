"use client";

import {
  IconDashboard,
  IconDots,
  IconUserPlus,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { getProjects, Project } from "@/services/ProjectService";

interface ActiveOrganisationNavItem {
  organisation_id: string;
  name: string;
  description: string | null;
}

interface ProjectNavProps {
  activeOrganisation: ActiveOrganisationNavItem | null;
}

export function SidebarProjects({ activeOrganisation }: ProjectNavProps) {
  const { isMobile } = useSidebar();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeOrganisation?.organisation_id) {
      setLoading(true);
      getProjects(activeOrganisation.organisation_id)
        .then((fetchedProjects: Project[]) => {
          setProjects(fetchedProjects);
        })
        .catch((error) => {
          console.error(
            `Error fetching projects for organisation ${activeOrganisation.organisation_id}:`,
            error
          );
          setProjects([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setProjects([]);
    }
  }, [activeOrganisation]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {loading ? (
          <span className="px-2 text-sm">Loading projects...</span>
        ) : projects.length === 0 ? (
          <span className="px-2 text-sm">No projects found.</span>
        ) : (
          projects.map((project: Project) => (
            <SidebarMenuItem key={project.project_id}>
              <SidebarMenuButton asChild>
                <a
                  href={`/organisation/${project.organisation_id}/project/${project.project_id}`}
                >
                  <span>{project.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm"
                  >
                    <IconDots />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuLabel className="font-bold">
                    Actions
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <IconDashboard />
                    <span>Project Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconUserPlus />
                    <span>Invite</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}