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

const layout: React.FC<layoutProps> = async ({ children }) => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["tournament"],
      queryFn: async () => {
        const data = handleEden(await rpc.api.tournament.get());
        return data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["tournament-user"],
      queryFn: async () => {
        const data = handleEden(await rpc.api.tournament.user.get());
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
