import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useQuery } from "@tanstack/react-query";

export const TournamentHook = () => {
  const tournamentQuery = useQuery({
    queryKey: ["tournament"],
    enabled: false,
    queryFn: async () => handleEden(await rpc.api.tournament.get()),
  });

  const tournamentUserQuery = useQuery({
    queryKey: ["tournament"],
    enabled: false,
    queryFn: async () => handleEden(await rpc.api.tournament.user.get()),
  });

  return { tournamentQuery, tournamentUserQuery };
};
