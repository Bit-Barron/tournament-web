import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
  params: {
    tournamentId: string;
  };
}

const layout: React.FC<layoutProps> = async ({ children, params }) => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["tournament", params.tournamentId],
      queryFn: async () => {
        const data = handleEden(
          await rpc.api.tournament[params.tournamentId].get(),
        );
        return data;
      },
    }),

    queryClient.prefetchQuery({
      queryKey: ["tournament", params.tournamentId, "participants"],
      queryFn: async () => {
        const data = handleEden(
          await rpc.api.tournament[params.tournamentId].participants.get(),
        );
        return data.participants;
      },
    }),

    queryClient.prefetchQuery({
      queryKey: ["tournament-winners", params.tournamentId],
      queryFn: async () => {
        const data = handleEden(
          await rpc.api.tournament["tournament-winners"][
            params.tournamentId
          ].get(),
        );

        return data;
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
