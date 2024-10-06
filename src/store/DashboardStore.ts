import { proxy } from "valtio";
import {
  FiLayout,
  FiUsers,
  FiCalendar,
  FiGitBranch,
  FiBarChart2,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";
import { IoIosTrophy } from "react-icons/io";

export type DashboardStore = typeof DashboardStore;

export const DashboardStore = proxy({
  tabs: [
    { name: "Dashboard", href: "/", icon: FiLayout },
    { name: "Tournaments", href: "/tournaments", icon: IoIosTrophy },
    { name: "Participants", href: "/participants", icon: FiUsers },
    { name: "Schedule", href: "/schedule", icon: FiCalendar },
    { name: "Brackets", href: "/brackets", icon: FiGitBranch },
    { name: "Reports", href: "/reports", icon: FiBarChart2 },
    { name: "Messages", href: "/messages", icon: FiMessageSquare },
    { name: "Settings", href: "/settings", icon: FiSettings },
  ],
});
