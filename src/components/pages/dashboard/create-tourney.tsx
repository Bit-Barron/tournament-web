import React, { FormEvent, useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSnapshot } from "valtio";
import { TournamentStore } from "@/store/tournament/TournamentStore";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import { GAMETYPE } from "@/server/tournament/typebox";
import { toast } from "sonner";

interface CreateTournamentProps {
  variant?: any;
}

export const CreateTournament: React.FC<CreateTournamentProps> = ({
  variant,
}) => {
  const tournamentStore = useSnapshot(TournamentStore);
  const { tournamentMutation } = TournamentHook();
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    tournamentMutation
      .mutateAsync({
        game_type: tournamentStore.gameType as GAMETYPE,
        max_participants: tournamentStore.maxParticipants,
        hosted_by: "admin",
        start_date: new Date(),
        tournament_name: tournamentStore.tournamentName,
      })
      .then(() => {
        toast.success("Tournament created successfully");
        setOpen(false);
      })
      .catch(() => {
        toast.error("Failed to create tournament");
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant || "default"}>Create Tournament</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tournament</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new tournament.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <Input
            placeholder="Tournament Name"
            value={tournamentStore.tournamentName}
            onChange={(e) => tournamentStore.tournamentName}
            required
          />
          <Input
            placeholder="Game Type"
            value={tournamentStore.gameType}
            onChange={(e) => tournamentStore.gameType}
            required
          />
          <Input
            placeholder="Max Participants"
            value={tournamentStore.maxParticipants}
            onChange={(e) => tournamentStore.maxParticipants}
            required
          />
          <Input
            placeholder="Hosted By"
            value={tournamentStore.hostedBy}
            onChange={(e) => tournamentStore.hostedBy}
            required
          />
          <Input
            placeholder="Hosted By"
            value={tournamentStore.startDate as unknown as string}
            disabled
            required
          />

          <Button className="w-full">Create Tournament</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
