"use client";

import { TournamentHook } from "@/components/hooks/tournament-hook";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  const { tournamentIdQuery } = TournamentHook();

  return (
    <div>
      <div></div>
    </div>
  );
};
export default page;
