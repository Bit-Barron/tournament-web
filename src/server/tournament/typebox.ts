import { t } from "elysia";

export const tournamentSchema = t.Object({
  tournamentId: t.String({ minLength: 1, maxLength: 128 }),
});

export const tournamentCreateSchema = t.Object({
  tournament_name: t.String({ minLength: 1, maxLength: 128 }),
  game_type: t.Enum(GAMETYPE),
  max_participants: t.Number(),
  start_date: t.Date(),
  hosted_by: t.String({ minLength: 1, maxLength: 128 }),
});
