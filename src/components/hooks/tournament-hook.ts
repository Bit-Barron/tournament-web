import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const TournamentHook = () => {
  const params = useParams();

  const tournamentQuery = useQuery({
    queryKey: ["tournament"],
    queryFn: async () => handleEden(await rpc.api.tournament.get()),
  });

  const tournamentUserQuery = useQuery({
    queryKey: ["tournament"],
    queryFn: async () => handleEden(await rpc.api.tournament.user.get()),
  });

  const tournamentIdQuery = useQuery({
    queryKey: ["tournament", params.tournamentId],
    enabled: !!params.tournamentId,
    queryFn: async () => {
      return handleEden(
        await rpc.api.tournament[params.tournamentId as string].get(),
      );
    },
  });

  const participantsQuery = useQuery({
    queryKey: ["tournament", params.tournamentId, "participants"],
    enabled: !!params.tournamentId,
    queryFn: async () => {
      const data = handleEden(
        await rpc.api.tournament[
          params.tournamentId as string
        ].participants.get(),
      );
      return data.participants;
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

  const participantDeleteMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.tournament.user.delete>
    ) => handleEden(await rpc.api.tournament.user.delete(...args)),
  });

  return {
    tournamentDeleteMutation,
    participantDeleteMutation,
    participantsQuery,
    tournamentQuery,
    tournamentUserQuery,
    tournamentIdQuery,
    tournamentMutation,
  };
};
