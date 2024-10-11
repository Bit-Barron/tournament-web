import React, { useState, useEffect } from "react";
import { TournamentHook } from "@/components/hooks/tournament-hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ParticipantBracketProps {}

export const ParticipantBracket: React.FC<ParticipantBracketProps> = () => {
  const {
    participantsQuery,
    tournamentWinnersQuery,
    tournamentWinnersMutation,
  } = TournamentHook();
  const params = useParams();
  const [rounds, setRounds] = useState<any[][]>([]);
  const [selectedRound, setSelectedRound] = useState<number>(1);

  useEffect(() => {
    if (participantsQuery.data) {
      const roundsData = [];
      for (let i = 0; i < participantsQuery.data.length; i += 10) {
        roundsData.push(participantsQuery.data.slice(i, i + 10));
      }
      setRounds(roundsData);
    }
  }, [participantsQuery.data]);

  const handleWinnerSelection = async (
    participant: any,
    roundIndex: number,
  ) => {
    if (!params.tournamentId) return;

    try {
      await tournamentWinnersMutation.mutateAsync({
        tournamentId: parseInt(
          Array.isArray(params.tournamentId)
            ? params.tournamentId[0]
            : params.tournamentId,
        ),
        roundNumber: roundIndex + 1,
        winnerId: participant.id,
      });
      tournamentWinnersQuery.refetch();
    } catch (error) {
      console.error("Error selecting winner:", error);
    }
  };

  const handleRoundClick = (roundIndex: number) => {
    const brawlStarsIds = rounds[roundIndex].map(
      (participant) => participant.brawlstars_id,
    );
    console.log(`Brawl Stars IDs for Round ${roundIndex + 1}:`, brawlStarsIds);
  };

  return (
    <section className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Turnier Übersicht</h1>
      <Select
        onValueChange={(value) => {
          const roundNumber = Number(value);
          setSelectedRound(roundNumber);
          handleRoundClick(roundNumber - 1);
        }}
        defaultValue={selectedRound.toString()}
      >
        <SelectTrigger className="mb-4 w-[180px]">
          <SelectValue placeholder="Wähle eine Runde" />
        </SelectTrigger>
        <SelectContent>
          {rounds.map((_, index) => (
            <SelectItem key={index + 1} value={(index + 1).toString()}>
              Runde {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {rounds[selectedRound - 1] && (
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Runde {selectedRound}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {rounds[selectedRound - 1].map((participant) => {
              const isWinner = tournamentWinnersQuery.data?.some(
                (winner) =>
                  winner.winnerId === participant.id &&
                  winner.roundNumber === selectedRound,
              );
              return (
                <Card
                  key={participant.id}
                  className={isWinner ? "border-2 border-green-500" : ""}
                >
                  <CardHeader>
                    <CardTitle>{participant.username}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Brawl Stars ID:</strong>{" "}
                      {participant.brawlstars_id}
                    </p>
                    <p>
                      <strong>Discord ID:</strong> {participant.discord_id}
                    </p>
                    <Button
                      onClick={() =>
                        handleWinnerSelection(participant, selectedRound - 1)
                      }
                      disabled={isWinner}
                      className={isWinner ? "bg-green-500" : ""}
                    >
                      {isWinner ? "Gewinner" : "Als Gewinner markieren"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
