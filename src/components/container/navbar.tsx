import React, { useState } from "react";
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
import { CiMenuBurger, CiSearch, CiBellOn } from "react-icons/ci";
import { UserHook } from "../hooks/user-hook";

export const Navbar = () => {
  const dashboardStore = useSnapshot(DashboardStore);
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const { meQuery } = UserHook();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <FaTrophy className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              {meQuery?.data?.username}
            </span>
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
        <Button
          variant="outline"
          size="sm"
          className="h-8 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <CiMenuBurger className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
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
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="grid grid-cols-2 px-2 pb-3 pt-2">
            {dashboardStore.tabs.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab(item.name);
                  setMobileMenuOpen(false);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
