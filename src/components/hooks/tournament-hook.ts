import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useQuery } from "@tanstack/react-query";
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
    queryKey: ["tournamentId", params.tournamentId],
    queryFn: async () => {
      if (typeof params.orderId !== "string")
        throw new Error("Invalid orderId");
      return handleEden(
        await rpc.api.tournament[params.tournamentId as string].get(),
      );
    },
  });

  return { tournamentQuery, tournamentUserQuery, tournamentIdQuery };
};
