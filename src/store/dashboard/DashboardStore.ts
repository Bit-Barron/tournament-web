import { proxy } from "valtio";
import { FiLayout, FiUsers, FiGitBranch, FiSettings } from "react-icons/fi";
import { IoIosTrophy } from "react-icons/io";

export type DashboardStore = typeof DashboardStore;

export const DashboardStore = proxy({
  tabs: [
    { name: "Dashboard", href: "/dashboard/", icon: FiLayout },
    { name: "Tournaments", href: "/dashboard/tournament", icon: IoIosTrophy },
    { name: "Participants", href: "/dashboard/participants", icon: FiUsers },
    { name: "Brackets", href: "/dashboard/brackets", icon: FiGitBranch },
  ],
});
