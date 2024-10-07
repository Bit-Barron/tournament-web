import { TournamentHook } from "@/components/hooks/tournament-hook";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  const { tournamentIdQuery } = TournamentHook();

  return (
    <section>
      <h1>test</h1>
    </section>
  );
};

export default page;
