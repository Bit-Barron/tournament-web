"use client";

import { TournamentHook } from "@/components/hooks/tournament-hook";
import { TournamentCombobox } from "@/components/pages/brackets/tournament-combobox";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  const { tournamentQuery } = TournamentHook();
  const tournaments = tournamentQuery.data || [];

  const handleAddTournament = (id: string) => {
    console.log(id);
  };

  return (
    <div>
      <TournamentCombobox
        tournaments={tournaments}
        onAddTournament={(name) => handleAddTournament(name)}
      />
    </div>
  );
};

export default page;
