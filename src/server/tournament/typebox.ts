import { t } from "elysia";

export const tournamentSchema = t.Object({
  tournamentId: t.String({ minLength: 1, maxLength: 128 }),
});
