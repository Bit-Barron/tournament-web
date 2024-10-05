import { decrypt } from "@/lib/jwt";
import { serverEnv } from "@/utils/env/server";
import { User } from "@prisma/client";
import { Elysia, InternalServerError } from "elysia";

/**
 * User route for retrieving the current user's information.
 * Needs to be combined at the `app/api/[[...route]]/route.ts` file.
 * Represents RPC client types based on input & output.
 */
export const userRoute = new Elysia({ prefix: "/user" }).get(
  "/me",
  async (ctx) => {
    // Decrypt user information from the authentication jwt cookie
    const user = await decrypt<User>(ctx.cookie[serverEnv.AUTH_COOKIE].value);

    if (!user) throw new InternalServerError("User not found");

    return user;
  },
);
