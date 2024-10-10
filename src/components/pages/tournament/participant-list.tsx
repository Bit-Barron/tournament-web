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
import React from "react";
import { toast } from "sonner";

export const ParticipantList = ({}) => {
  const { participantsQuery } = TournamentHook();
  const participants = participantsQuery.data || [];
  const { participantDeleteMutation } = TournamentHook();

  const deleteUser = async (discord_id: string) => {
    try {
      await participantDeleteMutation.mutateAsync({
        discordId: discord_id,
      });
      participantsQuery.refetch();
      toast.success(`Participant ${discord_id} deleted successfully`);
    } catch (error) {
      toast.error("Error deleting participant");
      console.error("Error deleting participant:", error);
    }
  };

  return (
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
            {participants?.map((participant, index) => (
              <TableRow key={index}>
                <TableCell>{participant.username}</TableCell>
                <TableCell>{participant.brawlstars_id}</TableCell>
                <TableCell>{participant.discord_id}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      deleteUser(participant.discord_id);
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
  );
};
