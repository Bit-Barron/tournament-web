"use client";

import { TournamentHook } from "@/components/hooks/tournament-hook";

import { useRouter } from "next/navigation";
import React from "react";

interface pageProps {}

const Page: React.FC<pageProps> = ({}) => {
  const { tournamentIdQuery } = TournamentHook();
  const tournament = tournamentIdQuery.data;
  const router = useRouter();

  if (!tournament) router.push("/dashboard/tournament");

  console.log(tournament);
  return (
    <div>
      <h1>barron</h1>
    </div>
  );
};
export default Page;
