"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy } from "lucide-react";
import { HomeStore } from "@/store/home/HomeStore";
import { useSnapshot } from "valtio";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import { useRouter } from "next/navigation";

export default function TournamentEntry() {
  const { tournamentId, brawlStarsId, username } = useSnapshot(HomeStore);
  const { createUserMutation, tournamentQuery } = TournamentHook();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation
      .mutateAsync({
        discord_id: "Created on the website",
        username,
        brawlstars_id: brawlStarsId,
        tournamentId,
      })
      .then(() => {
        router.push("/leaderboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Trophy className="h-6 w-6" />
            Turnier Beitritt
          </CardTitle>
          <CardDescription>
            WICHTIG: Bitte wähle ein Turnier aus und gib deine korrekte Brawl
            Stars ID an!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tournamentId">Turnier</Label>
              <Select
                value={tournamentId}
                onValueChange={(value) => {
                  HomeStore.tournamentId = value;
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wähle ein Turnier" />
                </SelectTrigger>
                <SelectContent>
                  {tournamentQuery.data && tournamentQuery.data.length > 0 ? (
                    tournamentQuery.data.map((tournament) => (
                      <SelectItem
                        key={tournament.id}
                        value={tournament.id.toString()}
                      >
                        {tournament.id}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-tournaments">
                      Keine Turniere verfügbar
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brawlStarsId">Brawl Stars ID</Label>
              <Input
                id="brawlStarsId"
                value={brawlStarsId}
                onChange={(e) => (HomeStore.brawlStarsId = e.target.value)}
                placeholder="Deine Brawl Stars ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => (HomeStore.username = e.target.value)}
                placeholder="Dein Benutzername"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Turnier beitreten
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
