"use client";

import { MyCard } from "@/components/elements/my-card";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import { UserHook } from "@/components/hooks/user-hook";
import { CreateTournament } from "@/components/pages/dashboard/create-tourney";
import { OngoingTournaments } from "@/components/pages/dashboard/card/active-tourneys";
import { RecentResults } from "@/components/pages/dashboard/card/result-card";
import { UpcomingMatches } from "@/components/pages/dashboard/card/match-list";
import {
  recentResults,
  upcomingMatches,
} from "@/components/pages/dashboard/utils/constants";
import { FaCalendarAlt, FaDollarSign, FaTrophy, FaUsers } from "react-icons/fa";

export default function MainPage() {
  const { meQuery } = UserHook();
  const { tournamentQuery, tournamentUserQuery } = TournamentHook();
  const tournamentData = tournamentQuery.data || [];
  const tournamentUserData = tournamentUserQuery.data || [];

  return (
    <main>
      <div className="bg-background p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-2 text-3xl font-bold">
            <h1>Hello,</h1>
            <span>
              {meQuery.data?.username[0].toUpperCase() +
                (meQuery.data?.username?.slice(1) ?? "")}
            </span>
          </div>

          <CreateTournament />
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MyCard
            cardTitle="Total Tournaments"
            cardStat={tournamentData.length}
            lastMonth={"+2 from last month"}
            CardIcon={FaTrophy}
          />
          <MyCard
            cardTitle="Active Players"
            cardStat={tournamentUserData.length || 0}
            lastMonth={"+18 from last week"}
            CardIcon={FaUsers}
          />
          <MyCard
            cardTitle="Upcoming Matches"
            cardStat={tournamentData.length || 0}
            lastMonth={"no change from last month"}
            CardIcon={FaCalendarAlt}
          />
          <MyCard
            cardTitle="Prize Pool"
            cardStat={`${process.env.NEXT_PUBLIC_PRICE_POOL}€`}
            lastMonth={""}
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
