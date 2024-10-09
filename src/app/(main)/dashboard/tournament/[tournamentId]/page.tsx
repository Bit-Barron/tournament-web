"use client";

import React from "react";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getStatusStyle } from "@/components/utils/constants";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { tournamentIdQuery, participantsQuery } = TournamentHook();
  const tournament = tournamentIdQuery.data;
  const participants = participantsQuery.data || [];
  const { participantDeleteMutation } = TournamentHook();

  if (!tournament) {
    return (
      <div className="flex h-screen items-center justify-center">
        No tournament data available.
      </div>
    );
  }

  const handleDeleteParticipant = async (discordId: string) => {
    await participantDeleteMutation.mutateAsync({ discordId: discordId });
  };

  return (
    <main className="container mx-auto px-4 py-8">
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

      <Card>
        <CardHeader>
          <CardTitle>Participant List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Brawl Stars ID</TableHead>
                <TableHead>Discord ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant, index) => (
                <TableRow key={index}>
                  <TableCell>{participant.username}</TableCell>
                  <TableCell>{participant.brawlstars_id}</TableCell>
                  <TableCell>{participant.discord_id}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        const deleteUser = async () => {
                          try {
                            await participantDeleteMutation.mutateAsync({
                              discordId: participant.discord_id,
                            });
                          } catch (error) {
                            console.error("Error deleting participant:", error);
                          }
                        };
                        deleteUser();
                      }}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
