export type TournamentData = {
  id: number;
  tournament_name: string;
  start_date: Date;
  game_type: $Enums.GameType;
  status: $Enums.TournamentStatus;
  max_participants: number;
  hosted_by: string;
  participants: string[];
  tournament_id?: number;
};

export type TournamentStatus = "PENDING" | "ONGOING" | "COMPLETED" | "CANCELED";

export type Participant = {
  id: number;
  username: string;
  brawlstars_id: string;
  discord_id: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
};
