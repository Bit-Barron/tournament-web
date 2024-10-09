import getQueryClient from "@/lib/react-query";
import { rpc } from "@/lib/rpc";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
  params: {
    tournamentId: number;
  };
}

const layout: React.FC<layoutProps> = async ({ children, params }) => {
  const queryClient = getQueryClient();
  const tournament = params.tournamentId;

  return <section>{children}</section>;
};

export default layout;
