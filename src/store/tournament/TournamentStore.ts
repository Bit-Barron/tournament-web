import { proxy } from "valtio";

export type GameType = "SOLO" | "DOU" | "TRIOS";

export interface TournamentState {
  tournamentName: string;
  gameType: GameType;
  maxParticipants: number;
  startDate: string;
  hostedBy?: string;
}

export const TournamentStore = proxy<TournamentState>({
  tournamentName: "Tournament",
  gameType: "SOLO",
  maxParticipants: 60,
  startDate: new Date().toISOString(),
  hostedBy: "admin",
});

export type TournamentStore = typeof TournamentStore;
