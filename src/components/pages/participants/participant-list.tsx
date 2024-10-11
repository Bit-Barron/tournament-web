import React, { useState, useEffect } from "react";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { ParticipantStore } from "@/store/tournament/ParticipantStore";
import { useSnapshot } from "valtio";

export const ParticipantList = () => {
  const {
    participantsQuery,
    participantDeleteMutation,
    tournamentWinnersQuery,
    tournamentWinnersMutation,
  } = TournamentHook();
  const { rounds, selectedRound } = useSnapshot(ParticipantStore);
  const params = useParams();

  useEffect(() => {
    if (participantsQuery.data) {
      const roundsData = [];
      for (let i = 0; i < participantsQuery.data.length; i += 10) {
        roundsData.push(participantsQuery.data.slice(i, i + 10));
      }
      ParticipantStore.rounds = roundsData;
    }
  }, [participantsQuery.data]);

  const deleteUser = async (discord_id: string) => {
    try {
      await participantDeleteMutation.mutateAsync({
        discordId: discord_id,
      });
      participantsQuery.refetch();
      toast.success(`Participant ${discord_id} deleted successfully`);
    } catch (error) {
      toast.error("Error deleting participant");
    }
  };

  const handleWinnerSelection = async (participant: any) => {
    if (!params.tournamentId) return;

    try {
      await tournamentWinnersMutation.mutateAsync({
        tournamentId: parseInt(
          Array.isArray(params.tournamentId)
            ? params.tournamentId[0]
            : params.tournamentId,
        ),
        roundNumber: selectedRound,
        winnerId: participant.id,
      });
      await tournamentWinnersQuery.refetch();
      toast.success(
        `${participant.username} selected as winner for Round ${selectedRound}`,
      );
    } catch (error) {
      toast.error("Error selecting winner");
    }
  };

  const isWinner = (participant: any) => {
    return tournamentWinnersQuery.data?.some(
      (winner) =>
        winner.winnerId === participant.id &&
        winner.roundNumber === selectedRound,
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Participant List</span>
          <Select
            value={selectedRound.toString()}
            onValueChange={(value) => {
              ParticipantStore.selectedRound = parseInt(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Round" />
            </SelectTrigger>
            <SelectContent>
              {rounds.map((_, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  Round {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>

              <TableHead>Username</TableHead>
              <TableHead>Brawl Stars ID</TableHead>
              <TableHead>Discord ID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rounds[selectedRound - 1]?.map((participant, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{participant.username}</TableCell>
                <TableCell>{participant.brawlstars_id}</TableCell>
                <TableCell>{participant.discord_id}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button
                      onClick={() => deleteUser(participant.discord_id)}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleWinnerSelection(participant)}
                      variant={isWinner(participant) ? "default" : "outline"}
                      size="sm"
                      disabled={isWinner(participant)}
                    >
                      {isWinner(participant) ? "Winner" : "Select Winner"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
