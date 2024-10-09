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

  await queryClient.prefetchQuery({
    queryKey: ["tournament"],
    queryFn: async () => {
      const { data } = await rpc.api.tournament.get();

      return data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["tournament"],
    queryFn: async () => {
      const { data } = await rpc.api.tournament.user.get();
      return data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
