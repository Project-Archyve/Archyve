import {
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconLifebuoy,
  IconReport,
  IconScript,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const sidebarData = {
  primary: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Artefacts",
      url: "/dashboard/artefacts",
      icon: IconScript,
      items: [
        {
          title: "Create Artefact",
          url: "/artefacts/create",
        },
      ]
    },
    {
      title: "Members",
      url: "/dashboard/members",
      icon: IconUsers,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
  ],
  secondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Feedback",
      url: "#",
      icon: IconLifebuoy,
    },
  ],
  projects: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};
