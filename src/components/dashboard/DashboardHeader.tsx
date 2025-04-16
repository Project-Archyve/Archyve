"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { IconDashboard, IconScript, IconSettings, IconUsersGroup } from "@tabler/icons-react";
import { DashboardMain } from "./DashboardMain";
import { ArtefactMain } from "../artefacts/ArtefactMain";

export function DashboardHeader() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <IconDashboard className="h-4 w-4" />,
      content: <DashboardMain />,
      showBadgeCount: false,
    },
    {
      id: "artefacts",
      label: "Artefacts",
      icon: <IconScript className="h-4 w-4" />,
      content: <ArtefactMain />,
      showBadgeCount: true,
      badgeCount: 33,
    },
    {
      id: "team",
      label: "Team",
      icon: <IconUsersGroup className="h-4 w-4" />,
      content: "Team",
      showBadgeCount: true,
      badgeCount: 4,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <IconSettings className="h-4 w-4" />,
      content: "Settings",
      showBadgeCount: false,
    },0
  ];

  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <Tabs
            defaultValue="dashboard"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-none data-[state=active]:shadow-none relative",
                    "border-b-1 border-transparent dark:data-[state=active]:border-b-primary",
                    "focus-visible:bg-accent/50 focus-visible:border-transparent"
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.showBadgeCount === true && <Badge>{tab.badgeCount}</Badge>}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="ml-auto flex items-center gap-2">
            {/* If you want anything on the right side of the header, place it here. */}
          </div>
        </div>
      </header>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </>
  );
}
