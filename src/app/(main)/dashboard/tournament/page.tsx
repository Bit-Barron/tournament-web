"use client";

import { TournamentHook } from "@/components/hooks/tournament-hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CalendarDays, MapPin, Users, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const TournamentPage: React.FC = () => {
  const { tournamentQuery, tournamentDeleteMutation } = TournamentHook();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await tournamentDeleteMutation.mutateAsync({
        tournamentId: id,
      });
      toast.success("Tournament deleted successfully");
      tournamentQuery.refetch();
    } catch (error) {
      toast.error("Failed to delete tournament");
    }
  };

  const tournaments = tournamentQuery.data || [];

  return (
    <div className="flex min-h-screen flex-col items-center py-8">
      <h1 className="mb-8 text-3xl font-bold">All Tournaments</h1>
      {tournaments.length === 0 && (
        <div className="flex h-32 items-center justify-center">
          No tournaments found
        </div>
      )}
      <div className="w-full max-w-7xl px-4">
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
                    <span>
                      {new Date(tournament.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{tournament.game_type}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{tournament.max_participants} participants</span>
                  </div>
                  <div className="font-medium">
                    Hosted by {tournament.hosted_by}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleDelete(tournament.id)}
                      className="w-full"
                      variant="destructive"
                    >
                      <Trash2Icon className="h-6" />
                      Delete
                    </Button>
                  </div>
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/tournament/${tournament.id}`)
                    }
                    className="w-full"
                    variant="secondary"
                  >
                    Manage Tournament
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentPage;
