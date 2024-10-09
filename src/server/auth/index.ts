import { encrypt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { serverEnv } from "@/utils/env/server";
import { Elysia, InternalServerError } from "elysia";
import { authUser } from "./typebox";

export const authRoute = new Elysia({ prefix: "/auth" })
  .post(
    "/register",
    async (ctx) => {
      const userExist = await prisma.admin.findFirst({
        where: { username: ctx.body.username.trim() },
      });
      if (userExist) throw new InternalServerError("User already exists");

      const user = await prisma.admin.create({
        data: {
          username: ctx.body.username.trim(),
          password: ctx.body.password.trim(),
        },
      });

      ctx.cookie[serverEnv.AUTH_COOKIE].set({
        value: await encrypt(user),
        path: "/",
        httpOnly: true,
        maxAge: serverEnv.SEVEN_DAYS,
      });

      return "success";
    },
    { body: authUser },
  )
  .post(
    "/login",
    async (ctx) => {
      const user = await prisma.admin.findFirst({
        where: {
          username: ctx.body.username.trim(),
          password: ctx.body.password.trim(),
        },
      });

      if (!user) throw new InternalServerError("User not found");

      ctx.cookie[serverEnv.AUTH_COOKIE].set({
        value: await encrypt(user),
        path: "/",
        httpOnly: true,
        maxAge: serverEnv.SEVEN_DAYS,
      });

      return "success";
    },
    { body: authUser },
  )
  .get("/logout", (ctx) => {
    ctx.cookie[serverEnv.AUTH_COOKIE].set({
      value: "",
      path: "/",
      httpOnly: true,
      maxAge: 0,
    });
    return "success";
  });
