"use client";

import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { createElement, useEffect, useState } from "react";
import { getIconComponent } from "@/lib/iconComponents";

interface OrganisationNavItem {
  organisation_id: string;
  name: string;
  description: string | null;
  icon: string;
}

interface OrganisationNavProps {
  organisations: OrganisationNavItem[];
  setActiveOrganisation: (organisation: OrganisationNavItem) => void;
}

export function SidebarSwitcher({
  organisations,
  setActiveOrganisation,
}: OrganisationNavProps) {
  const { isMobile } = useSidebar();
  const [activeOrganisation, setLocalActiveOrganisation] =
    useState<OrganisationNavItem | null>(organisations.length > 0 ? organisations[0] : null);

  useEffect(() => {
    if (organisations.length > 0 && !activeOrganisation) {
      setLocalActiveOrganisation(organisations[0]);
      setActiveOrganisation(organisations[0]);
    }
  }, [organisations, activeOrganisation, setActiveOrganisation]);

  if (!activeOrganisation || organisations.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Loading...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const handleOrganisationChange = (organisation: OrganisationNavItem) => {
    setLocalActiveOrganisation(organisation);
    setActiveOrganisation(organisation);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {createElement(getIconComponent(activeOrganisation.icon), { className: "size-4" })}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeOrganisation.name}
                </span>
                <span className="truncate text-xs">
                  {activeOrganisation.description}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organisations
            </DropdownMenuLabel>
            {organisations.map(
              (organisation: OrganisationNavItem, index: number) => (
                <DropdownMenuItem
                  key={organisation.organisation_id}
                  onClick={() => handleOrganisationChange(organisation)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                  {createElement(getIconComponent(activeOrganisation.icon), { className: "size-4 shrink-0" })}
                  </div>
                  {organisation.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              )
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Join Organisation</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
