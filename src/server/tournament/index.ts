import prisma from "@/lib/prisma";
import Elysia from "elysia";
import { tournamentSchema } from "./typebox";

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
  );
