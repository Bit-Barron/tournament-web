import { Type as t } from "@sinclair/typebox/type";

export enum GAMETYPE {
  SOLO = "SOLO",
  DUO = "DUO",
  TRIOS = "TRIOS",
}

export const changeTournamentStatusSchema = t.Object({
  status: t.Union([
    t.Literal("PENDING"),
    t.Literal("ONGOING"),
    t.Literal("CANCELED"),
    t.Literal("COMPLETED"),
  ]),
  tournamentId: t.Number({ minLength: 1, maxLength: 128 }),
});

export const tournamentSchema = t.Object({
  tournamentId: t.Number({ minLength: 1, maxLength: 128 }),
});

export const participantSchema = t.Object({
  discordId: t.String({ minLength: 1, maxLength: 128 }),
});

export const tournamentCreateSchema = t.Object({
  tournament_name: t.String({ minLength: 1, maxLength: 128 }),
  game_type: t.Enum(GAMETYPE),
  max_participants: t.Number(),
  start_date: t.String(),
  hosted_by: t.String({ minLength: 1, maxLength: 128 }),
});

export const tournamentWinnerSchema = t.Object({
  tournamentId: t.Number({ minLength: 1, maxLength: 128 }),
  winnerId: t.Number({ minLength: 1, maxLength: 128 }),
  roundNumber: t.Number({ minLength: 1, maxLength: 128 }),
});

export const sendUserSchema = t.Object({
  roundNumber: t.Number({ minLength: 1, maxLength: 128 }),
  username: t.String({ minLength: 1, maxLength: 128 }),
  brawlstars_id: t.String({ minLength: 1, maxLength: 128 }),
  discord_id: t.String({ minLength: 1, maxLength: 128 }),
});

export const createUserSchema = t.Object({
  username: t.String({ minLength: 1, maxLength: 128 }),
  brawlstars_id: t.String({ minLength: 1, maxLength: 128 }),
  discord_id: t.String({ minLength: 1, maxLength: 128 }),
  tournamentId: t.String({ minLength: 1, maxLength: 128 }),
});
