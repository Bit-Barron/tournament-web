import { encrypt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { serverEnv } from "@/utils/env/server";
import { Elysia, InternalServerError } from "elysia";
import { authUser } from "./typebox";


export const authRoute = new Elysia({ prefix: "/auth" })
  .post(
    "/register",
    async (ctx) => {
      // Check if user already exists
      const userExist = await prisma.admin.findFirst({
        where: { username: ctx.body.username.trim() },
      });
      if (userExist) throw new InternalServerError("User already exists");

      // Create new user
      const user = await prisma.admin.create({
        data: {
          username: ctx.body.username.trim(), // typesafe ctx.body based on `authUser` schema
          password: ctx.body.password.trim(), // typesafe ctx.body based on `authUser` schema
        },
      });

      // Set authentication cookie
      ctx.cookie[serverEnv.AUTH_COOKIE].set({
        value: await encrypt(user),
        path: "/",
        httpOnly: true,
        maxAge: serverEnv.SEVEN_DAYS,
      });

      return "success";
    },
    { body: authUser }, // Use authUser schema for request body validation
  )
  .post(
    "/login",
    async (ctx) => {
      // Find user by username and password
      const user = await prisma.admin.findFirst({
        where: {
          username: ctx.body.username.trim(), // typesafe ctx.body based on `authUser` schema
          password: ctx.body.password.trim(), // typesafe ctx.body based on `authUser` schema
        },
      });

      if (!user) throw new InternalServerError("User not found");

      // Set authentication cookie
      ctx.cookie[serverEnv.AUTH_COOKIE].set({
        value: await encrypt(user),
        path: "/",
        httpOnly: true,
        maxAge: serverEnv.SEVEN_DAYS,
      });

      return "success";
    },
    { body: authUser }, // Use authUser schema for request body validation
  )
  .get("/logout", (ctx) => {
    // Clear authentication cookie
    ctx.cookie[serverEnv.AUTH_COOKIE].set({
      value: "",
      path: "/",
      httpOnly: true,
      maxAge: 0,
    })
    return "success";
  });
