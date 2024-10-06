import prisma from "@/lib/prisma";
import Elysia from "elysia";

export const tournamentRoute = new Elysia({ prefix: "/tournament" })
  .get("", async () => {
    const tournament = await prisma.tournament.findMany();
    console.log("TOURNAMET DATA", tournament);
    return tournament;
  })
  .get("/user", async () => {
    const tournament = await prisma.user.findMany();

    console.log("TOURNAMENT SUER", tournament);
    return tournament;
  });
