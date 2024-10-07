import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateTournamentProps {}

export const CreateTournament: React.FC<CreateTournamentProps> = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Tournament</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tournament</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new tournament.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>Tournament creation form goes here.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
