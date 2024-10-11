"use client";

import React, { useState } from "react";
import { DashboardStore } from "@/store/dashboard/DashboardStore";
import { useSnapshot } from "valtio";
import { FaTrophy } from "react-icons/fa";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { UserHook } from "@/components/hooks/user-hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/utils/theme-switch";
import { CreateTournament } from "@/components/pages/dashboard/create-tourney";

export const Navbar = () => {
  const dashboardStore = useSnapshot(DashboardStore);
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const { meQuery } = UserHook();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="ml-2 mr-3 flex items-center space-x-2" href="/">
            <FaTrophy className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              {meQuery?.data?.username}
            </span>
          </a>
          <nav className="flex items-center space-x-6">
            {dashboardStore.tabs.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={`h-8`}
                onClick={() => {
                  setActiveTab(item.name);
                  router.push(item.href);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span className="font-bold">{item.name}</span>
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
          <CreateTournament variant={"ghost"} />
          <ThemeToggle />
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
