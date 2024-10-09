"use client";

import { TournamentHook } from "@/components/hooks/tournament-hook";
import { TournamentData } from "@/types/tournament";
import React from "react";

interface pageProps {}

const Page: React.FC<pageProps> = ({}) => {
  const { tournamentIdQuery } = TournamentHook();
  const data = tournamentIdQuery.data as TournamentData;

  return (
    <div>
      <h1>barron</h1>
    </div>
  );
};
export default Page;
