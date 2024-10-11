import { authRoute } from "@/server/auth";
import { tournamentRoute } from "@/server/tournament";
import { userRoute } from "@/server/user";
import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api", aot: false })
  .use(userRoute)
  .use(authRoute)
  .use(tournamentRoute);

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
