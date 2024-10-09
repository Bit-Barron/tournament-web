import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const TournamentHook = () => {
  const params = useParams();

  const tournamentQuery = useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => handleEden(await rpc.api.tournament.get()),
  });

  const tournamentUserQuery = useQuery({
    queryKey: ["tournament"],
    queryFn: async () => handleEden(await rpc.api.tournament.user.get()),
  });

  const tournamentIdQuery = useQuery({
    queryKey: ["order", params.tournamentId],
    enabled: true,
    queryFn: async () => {
      if (typeof params.orderId !== "string") throw new Error("Error");
      return handleEden(await rpc.api.tournament[params.tournamentId as string].get());
    },
  });

  const tournamentMutation = useMutation({
    mutationFn: async (...args: Parameters<typeof rpc.api.tournament.post>) =>
      handleEden(await rpc.api.tournament.post(...args)),
  });

  const tournamentDeleteMutation = useMutation({
    mutationFn: async (...args: Parameters<typeof rpc.api.tournament.delete>) =>
      handleEden(await rpc.api.tournament.delete(...args)),
  });

  return {
    tournamentDeleteMutation,
    tournamentQuery,
    tournamentUserQuery,
    tournamentIdQuery,
    tournamentMutation,
  };
};
