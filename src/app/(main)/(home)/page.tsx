"use client";

import { redirect, useRouter } from "next/navigation";
import { UserHook } from "@/components/hooks/user-hook";

export default function TournamentEntry() {
  const { meQuery } = UserHook();

  if (meQuery.data) {
    redirect("/dashboard/");
  } else {
    redirect("/login");
  }
}
