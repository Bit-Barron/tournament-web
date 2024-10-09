"use client";

import { TournamentHook } from "@/components/hooks/tournament-hook";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  const { tournamentIdQuery } = TournamentHook();

  console.log("tournamentIdQuery", tournamentIdQuery.data?.data);

  return (
    <div>
      <div>Tournaments</div>
    </div>
  );
};
export default page;
