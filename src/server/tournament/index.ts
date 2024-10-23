import prisma from "@/lib/prisma";
import Elysia, { InternalServerError } from "elysia";
import axios from "axios";
import {
  changeTournamentStatusSchema,
  createUserSchema,
  participantSchema,
  sendUserSchema,
  tournamentCreateSchema,
  tournamentSchema,
  tournamentWinnerSchema,
} from "./typebox";

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

      console.log(ctx.body);
      const tournament = await prisma.tournament.create({
        data: {
          tournament_name,
          game_type,
          max_participants,
          start_date,
          hosted_by,
        },
      });

      console.log(tournament);

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
  .delete(
    "/user",
    async (ctx) => {
      const { discordId } = ctx.body;

      try {
        const user = await prisma.user.findUnique({
          where: { discord_id: discordId },
          include: { participations: true },
        });

        if (!user) {
          throw new InternalServerError("User not found");
        }

        await prisma.participation.deleteMany({
          where: { userId: user.id },
        });

        await prisma.user.delete({
          where: { discord_id: discordId },
        });

        return { message: "User deleted successfully" };
      } catch (err) {
        console.error(err);
        throw new InternalServerError(err as string);
      }
    },
    { body: participantSchema },
  )
  .post(
    "/tournament-winners",
    async (ctx) => {
      try {
        const { tournamentId, roundNumber, winnerId } = ctx.body;

        const updatedRound = await prisma.tournamentRound.upsert({
          where: {
            tournamentId_roundNumber: {
              tournamentId,
              roundNumber,
            },
          },
          update: {
            winnerId,
          },
          create: {
            tournamentId,
            roundNumber,
            winnerId,
          },
        });

        return {
          success: true,
          data: updatedRound,
        };
      } catch (err) {
        console.error(err);
        throw new InternalServerError(err as string);
      }
    },
    { body: tournamentWinnerSchema },
  )
  .get("/tournament-winners/:tournamentId", async (ctx) => {
    const { tournamentId } = ctx.params;

    try {
      const tournamentWinners = await prisma.tournamentRound.findMany({
        where: {
          tournamentId: Number(tournamentId),
        },
        include: {
          winner: true,
        },
      });

      return tournamentWinners;
    } catch (err) {
      console.error(err);
      throw new InternalServerError(err as string);
    }
  })
  .post(
    "/send-user",
    async (ctx) => {
      const { roundNumber, username, brawlstars_id, discord_id } = ctx.body;
      const new_brawlstars_id = "28GR92Y998";
      try {
        const response = await axios.post(
          "http://0.0.0.0:8000/register-participants",
          {
            roundNumber,
            username,
            brawlstars_id: new_brawlstars_id,
            discord_id,
          },
        );

        console.log(response.data);
      } catch (err) {
        throw new InternalServerError(err as string);
      }
    },

    { body: sendUserSchema },
  )
  .post(
    "/create-user",
    async (ctx) => {
      const { discord_id, username, brawlstars_id, tournamentId } = ctx.body;

      try {
        const user = await prisma.user.create({
          data: {
            discord_id,
            username,
            brawlstars_id,
          },
        });

        return user;
      } catch (err) {
        console.error(err);
        throw new InternalServerError(err as string);
      }
    },
    { body: createUserSchema },
  )
  .patch(
    "/change-status",
    async (ctx) => {
      const { tournamentId, status } = ctx.body;
      if (!tournamentId || !status) {
        throw new InternalServerError("Invalid request");
      }
      const tournament = await prisma.tournament.update({
        where: {
          id: Number(tournamentId),
        },
        data: {
          status: status,
        },
      });
      return tournament;
    },

    { body: changeTournamentStatusSchema },
  )
  .get("/tournament-rounds", async (ctx) => {
    const tournamentRounds = await prisma.tournamentRound.findMany();
    return tournamentRounds;
  });
