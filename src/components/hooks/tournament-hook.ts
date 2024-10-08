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
    enabled: false,
    queryFn: async () => handleEden(await rpc.api.tournament.user.get()),
  });

  const tournamentIdQuery = useQuery({
    queryKey: ["tournamentId", params.tournamentId],
    queryFn: async () => {
      if (typeof params.orderId !== "string")
        throw new Error("Invalid orderId");
      return handleEden(
        await rpc.api.tournament.id.get(params.tournamentId as any),
      );
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
