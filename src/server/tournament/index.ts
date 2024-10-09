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
    "/:tournamentId",
    async (ctx) => {
      const { tournamentId } = ctx.params;

      try {
        const tournament = await prisma.tournament.findUnique({
          where: {
            id: Number(tournamentId),
          },
        });

        if (!tournament) {
          return { success: false, message: "Tournament not found" };
        }

        return tournament;
      } catch (err) {
        console.error(err);
        return { success: false, message: "Internal server error" };
      }
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
  )
  .delete(
    "",
    async (ctx) => {
      const { tournamentId } = ctx.body;
      const tournament = await prisma.tournament.delete({
        where: {
          id: Number(tournamentId),
        },
      });

      return tournament;
    },
    { body: tournamentSchema },
  );
