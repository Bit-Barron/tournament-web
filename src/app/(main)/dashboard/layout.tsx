import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = async ({ children }) => {
  const queryClient = getQueryClient();
  const tournamentData = await rpc.api.tournament.get();
  // const tournamentUserData = await rpc.api.tournament.user.get();

  queryClient.setQueryData(["tournament"], tournamentData.data);
  // queryClient.setQueryData(["tournamentUser"], tournamentUserData.data);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
