import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = async ({ children }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const { data } = await rpc.api.tournament.all.get();

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
