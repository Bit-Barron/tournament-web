import { proxy } from "valtio";

export type GameType = "SOLO" | "DOU" | "TRIOS";

export interface TournamentState {
  tournamentName: string;
  gameType: GameType;
  maxParticipants: number;
  startDate?: Date;
  hostedBy?: string;
}

export const TournamentStore = proxy<TournamentState>({
  tournamentName: "Tournament",
  gameType: "SOLO",
  maxParticipants: 23,
  startDate: new Date(),
  hostedBy: "admin",
});

export type TournamentStore = typeof TournamentStore;
