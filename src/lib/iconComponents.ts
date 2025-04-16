import { IconCardboards, IconDashboard, IconUsers } from "@tabler/icons-react";

export const getIconComponent = (iconName: string) => {
  switch(iconName) {
    case 'IconUsers': return IconUsers;
    case 'IconDashboard': return IconDashboard;
    case 'IconCardboards': return IconCardboards;
    default: return IconUsers;
  }
}