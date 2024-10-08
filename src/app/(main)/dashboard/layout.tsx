import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = async ({ children }) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tournaments"],
    queryFn: async () => handleEden(await rpc.api.tournament.get()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
