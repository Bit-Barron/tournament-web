"use client";

import React from "react";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getStatusStyle } from "@/components/utils/helper";
import { ParticipantList } from "@/components/pages/tournament/participant-list";
import { TournamentOverviewChart } from "@/components/pages/tournament/tournament-chart";

const Page = () => {
  const { tournamentIdQuery, participantsQuery } = TournamentHook();
  const tournament = tournamentIdQuery.data;
  const participants = participantsQuery.data || [];

  console.log(participants);

  if (!tournament) {
    return (
      <div className="flex h-screen items-center justify-center">
        No tournament data available.
      </div>
    );
  }

  return (
    <main className="px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        {tournament?.tournament_name}
      </h1>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tournament Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>ID:</strong> {tournament?.id}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(tournament?.start_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Game Type:</strong> {tournament.game_type}
            </p>
            <p>
              <strong>Hosted By:</strong> {tournament.hosted_by}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(tournament.status)}`}
            >
              {tournament.status}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Max Participants:</strong> {tournament.max_participants}
            </p>
            <p>
              <strong>Current Participants:</strong> {participants.length}
            </p>
          </CardContent>
        </Card>
      </div>
      <ParticipantList />
      <div className="mt-10">
        <TournamentOverviewChart
          tournamentData={[
            { round: 1, participants: 10 },
            { round: 2, participants: 20 },
            { round: 3, participants: 30 },
            { round: 4, participants: 40 },
            { round: 5, participants: 50 },
            { round: 6, participants: 60 },

          ]}
          maxParticipants={60}
          currentParticipants={participants.length}
        />
      </div>
    </main>
  );
};

export default Page;
export const dynamic = "force-dynamic";
