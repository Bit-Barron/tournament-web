"use client";

import { MyCard } from "@/components/elements/my-card";
import { UserHook } from "@/components/hooks/user-hook";
import { OngoingTournaments } from "@/components/pages/dashboard/ongoing";
import { RecentResults } from "@/components/pages/dashboard/recent-results";
import { UpcomingMatches } from "@/components/pages/dashboard/upcoming-matches";
import {
  tournamentData,
  recentResults,
  upcomingMatches,
} from "@/components/pages/dashboard/utils/constants";
import { Button } from "@/components/ui/button";
import { FaCalendarAlt, FaDollarSign, FaTrophy, FaUsers } from "react-icons/fa";

interface MainPageProps {}

export default function MainPage(props: MainPageProps) {
  const { meQuery } = UserHook();

  return (
    <main>
      <div className="bg-background p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Tournament Dashboard</h1>
          <Button>Create Tournament</Button>
        </div>
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MyCard
            cardTitle="Total Tournaments"
            cardStat={"24"}
            lastMonth={"+2 from last month"}
            CardIcon={FaTrophy}
          />
          <MyCard
            cardTitle="Active Players"
            cardStat={"573"}
            lastMonth={"+18 from last week"}
            CardIcon={FaUsers}
          />
          <MyCard
            cardTitle="Upcoming Matches"
            cardStat={"12"}
            lastMonth={"Next 7 days"}
            CardIcon={FaCalendarAlt}
          />
          <MyCard
            cardTitle="Prize Pool"
            cardStat={"$45,231"}
            lastMonth={"+20.1% from last month"}
            CardIcon={FaDollarSign}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <OngoingTournaments tournaments={tournamentData} />
          <RecentResults results={recentResults} />
          <UpcomingMatches matches={upcomingMatches} />
        </div>
      </div>
    </main>
  );
}
