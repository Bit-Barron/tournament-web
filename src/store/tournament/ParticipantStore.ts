import { proxy } from "valtio";

type UserRole = "USER" | "BANNED";

type Participant = {
  id: number;
  username: string;
  brawlstars_id: string;
  discord_id: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
};

export type ParticipantStore = {
  rounds: Participant[][];
  selectedRound: number;
};

export const ParticipantStore = proxy<ParticipantStore>({
  rounds: [],
  selectedRound: 1,
});
