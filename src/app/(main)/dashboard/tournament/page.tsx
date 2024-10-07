"use client";

import { TournamentHook } from "@/components/hooks/tournament-hook";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CalendarDays, MapPin, Users } from "lucide-react";
import React from "react";

interface PageProps {}

const TournamentPage: React.FC<PageProps> = () => {
  const { tournamentQuery } = TournamentHook();
  const tournaments = tournamentQuery.data || [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">All Tournaments</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => (
          <Card key={tournament.id}>
            <CardHeader>
              <CardTitle>
                {tournament.tournament_name || "Unnamed Tournament"}
              </CardTitle>
              <CardDescription>{tournament.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>{tournament.start_date as any}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{tournament.game_type}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{tournament.max_participants} participants</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TournamentPage;
