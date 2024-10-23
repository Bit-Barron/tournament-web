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
  tournament_name: t.String({
    minLength: 1,
    maxLength: 128,
    error: "Tournament name must be between 1 and 128 characters",
  }),

  game_type: t.Enum(GAMETYPE, {
    error: "Game type must be either SOLO, DUO, or TRIOS",
  }),

  max_participants: t.Number({
    minimum: 1,
    maximum: 1000,
    error: "Maximum participants must be between 1 and 1000",
  }),

  start_date: t.String({
    format: "date-time",
    error: "Start date must be a valid date string",
  }),

  hosted_by: t.String({
    minLength: 1,
    maxLength: 128,
    error: "Host name must be between 1 and 128 characters",
  }),
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
