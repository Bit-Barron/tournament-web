import prisma from "@/lib/prisma";
import Elysia, { InternalServerError } from "elysia";
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
  .get("/:tournamentId", async (ctx) => {
    const { tournamentId } = ctx.params;

    try {
      const tournament = await prisma.tournament.findUnique({
        where: {
          id: Number(tournamentId),
        },
      });

      if (!tournament) {
        throw new InternalServerError("Tournament not found");
      }

      return tournament;
    } catch (err) {
      console.error(err);
      throw new InternalServerError(err as string);
    }
  })
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
  )
  .get("/:tournamentId/participants", async (ctx) => {
    const { tournamentId } = ctx.params;

    try {
      const tournament = await prisma.tournament.findUnique({
        where: {
          id: Number(tournamentId),
        },
        include: {
          participations: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!tournament) {
        throw new InternalServerError("Tournament not found");
      }

      const participants = tournament.participations.map(
        (participation) => participation.user,
      );

      return { participants };
    } catch (err) {
      console.error(err);
      throw new InternalServerError(err as string);
    }
  })
  .delete("/:tournamentId", async (ctx) => {
    const { tournamentId } = ctx.params;

    try {
      const tournament = await prisma.tournament.findUnique({
        where: {
          id: Number(tournamentId),
        },
      });

      if (!tournament) {
        throw new InternalServerError("Tournament not found");
      }

      await prisma.participation.deleteMany({
        where: {
          tournamentId: Number(tournamentId),
        },
      });

      await prisma.tournament.delete({
        where: {
          id: Number(tournamentId),
        },
      });

      return "success";
    } catch (err) {
      console.error(err);
      throw new InternalServerError(err as string);
    }
  });
