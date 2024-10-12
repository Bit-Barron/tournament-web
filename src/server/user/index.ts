import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";
import { Elysia, InternalServerError } from "elysia";

export const userRoute = new Elysia({ prefix: "/user" }).get(
  "/me",
  async (ctx) => {
    const user = await decrypt<User>(ctx.cookie[serverEnv.AUTH_COOKIE].value);

    if (!user) throw new InternalServerError("User not found");

    return user;
  },
);
