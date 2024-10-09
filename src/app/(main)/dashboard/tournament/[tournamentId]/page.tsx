"use client";

import React from "react";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import { Button } from "@/components/ui/button";
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
import { TournamentData } from "@/types/tournament";

const Page = () => {
  const { tournamentIdQuery } = TournamentHook();
  const data = tournamentIdQuery.data as TournamentData;

  if (!data) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        {data.tournament_name}
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tournament Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>ID:</strong> {data.id}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(data.start_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Game Type:</strong> {data.game_type}
            </p>
            <p>
              <strong>Hosted By:</strong> {data.hosted_by}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(data.status)}`}
            >
              {data.status}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Max Participants:</strong> {data.max_participants}
            </p>
            <p>
              <strong>Current Participants:</strong> {data.max_participants}
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
                <TableHead>Participant Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
