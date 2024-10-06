import { proxy } from "valtio";
import { FiLayout, FiUsers, FiGitBranch, FiSettings } from "react-icons/fi";
import { IoIosTrophy } from "react-icons/io";

export type DashboardStore = typeof DashboardStore;

export const DashboardStore = proxy({
  tabs: [
    { name: "Dashboard", href: "/", icon: FiLayout },
    { name: "Tournaments", href: "/tournaments", icon: IoIosTrophy },
    { name: "Participants", href: "/participants", icon: FiUsers },
    { name: "Brackets", href: "/brackets", icon: FiGitBranch },
  ],
});
