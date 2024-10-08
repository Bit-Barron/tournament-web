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

  await queryClient.prefetchQuery({
    queryKey: ["tournament", tournament],
    queryFn: async () => {
      const { data } = await rpc.api.tournament.id.get({
        tournamentId: tournament as unknown as number,
      });

      console.log("fetched data", data);
      return data;
    },
  });

  return <section>{children}</section>;
};

export default layout;
