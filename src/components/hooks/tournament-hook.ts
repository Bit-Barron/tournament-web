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
    queryKey: ["tournament-user"],
    queryFn: async () => handleEden(await rpc.api.tournament.user.get()),
  });

  const tournamentRoundQuery = useQuery({
    queryKey: ["tournament-round"],
    queryFn: async () =>
      handleEden(await rpc.api.tournament["tournament-rounds"].get()),
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

  const tournamentWinnersQuery = useQuery({
    queryKey: ["tournament-winners", params.tournamentId],
    enabled: !!params.tournamentId,
    queryFn: async () => {
      const data = handleEden(
        await rpc.api.tournament["tournament-winners"][
          params.tournamentId as string
        ].get(),
      );
      return data;
    },
  });

  const tournamentWinnersMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<
        (typeof rpc.api.tournament)["tournament-winners"]["post"]
      >
    ) =>
      handleEden(await rpc.api.tournament["tournament-winners"].post(...args)),
  });

  const sendUserMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<(typeof rpc.api.tournament)["send-user"]["post"]>
    ) => handleEden(await rpc.api.tournament["send-user"].post(...args)),
  });

  const createUserMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<(typeof rpc.api.tournament)["create-user"]["post"]>
    ) => handleEden(await rpc.api.tournament["create-user"].post(...args)),
  });

  const changeTournamentStatus = useMutation({
    mutationFn: async (
      ...args: Parameters<(typeof rpc.api.tournament)["change-status"]["patch"]>
    ) => handleEden(await rpc.api.tournament["change-status"].patch(...args)),
  });

  return {
    changeTournamentStatus,
    tournamentDeleteMutation,
    createUserMutation,
    sendUserMutation,
    tournamentWinnersMutation,
    tournamentWinnersQuery,
    participantDeleteMutation,
    participantsQuery,
    tournamentQuery,
    tournamentUserQuery,
    tournamentIdQuery,
    tournamentRoundQuery,
    tournamentMutation,
  };
};
