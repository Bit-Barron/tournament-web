import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
  params: {
    tournamentId: string;
  };
}

const layout: React.FC<layoutProps> = async ({ children, params }) => {
  const queryClient = getQueryClient();
  const tournament = params.tournamentId;
  const tournamentData = await rpc.api.tournament[tournament].get();

  queryClient.setQueryData(["tournament"], tournamentData.data);

  return <section>{children}</section>;
};

export default layout;
