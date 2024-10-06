import prisma from "@/lib/prisma";
import Elysia from "elysia";
import { tournamentCreateSchema, tournamentSchema } from "./typebox";

export const tournamentRoute = new Elysia({ prefix: "/tournament" })
  .get("", async () => {
    const tournament = await prisma.tournament.findMany();
    return tournament;
  })
  .get("/user", async () => {
    const tournament = await prisma.user.findMany();
    return tournament;
  })
  .get(
    "/:id",
    async (ctx) => {
      const { tournamentId } = ctx.params;
      console.log("test", tournamentId);
      const tournament = await prisma.tournament.findUnique({
        where: {
          id: Number(tournamentId),
        },
      });

      return tournament;
    },
    {
      params: tournamentSchema,
    },
  )
  .post(
    "",
    async (ctx) => {
      const {
        tournament_name,
        game_type,
        max_participants,
        start_date,
        hosted_by,
      } = ctx.body;
      const tournament = await prisma.tournament.create({
        data: {
          tournament_name,
          game_type,
          max_participants,
          start_date,
          hosted_by,
        },
      });

      return tournament;
    },
    { body: tournamentCreateSchema },
  );
