import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { DashboardStore } from "@/store/DashboardStore";
import { useSnapshot } from "valtio";
import { FaTrophy } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const dashboardStore = useSnapshot(DashboardStore);
  const [activeTab, setActiveTab] = React.useState("Dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <FaTrophy className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Admin</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {dashboardStore.tabs.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`h-8 ${activeTab === item.name ? "bg-muted" : ""}`}
                onClick={() => setActiveTab(item.name)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto h-8 lg:hidden"
            >
              <CiMenuBurger className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dashboardStore.tabs.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => setActiveTab(item.name)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-auto flex items-center space-x-4">
          <form className="hidden lg:block">
            <div className="relative">
              <CiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tournaments..."
                className="w-[200px] pl-8 md:w-[250px] lg:w-[300px]"
              />
            </div>
          </form>
          <Button variant="outline" size="sm" className="h-8">
            Create Tournament
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <CiBellOn className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New tournament request</DropdownMenuItem>
              <DropdownMenuItem>Participant approval needed</DropdownMenuItem>
              <DropdownMenuItem>Tournament results ready</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
