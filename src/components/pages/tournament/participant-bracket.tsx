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
import { Trophy } from "lucide-react";

export const ParticipantBracket: React.FC = () => {
  const {
    participantsQuery,
    tournamentWinnersQuery,
    tournamentWinnersMutation,
  } = TournamentHook();
  const params = useParams();
  const [rounds, setRounds] = useState<any[][]>([]);
  const [selectedRound, setSelectedRound] = useState<number>(1);
  const [currentRoundParticipants, setCurrentRoundParticipants] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (participantsQuery.data) {
      const roundsData = [];
      for (let i = 0; i < participantsQuery.data.length; i += 10) {
        roundsData.push(participantsQuery.data.slice(i, i + 10));
      }
      setRounds(roundsData);
      updateCurrentRoundParticipants(1);
    }
  }, [participantsQuery.data]);

  const updateCurrentRoundParticipants = (roundNumber: number) => {
    if (rounds[roundNumber - 1]) {
      const brawlStarsIds = rounds[roundNumber - 1].map(
        (participant) => participant.brawlstars_id,
      );
      setCurrentRoundParticipants(brawlStarsIds);
    }
  };
  console.log(currentRoundParticipants);

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

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          Turnier Übersicht
        </h1>

        <div className="mb-8 flex justify-center">
          <Select
            value={selectedRound.toString()}
            onValueChange={(value) => {
              const roundNumber = Number(value);
              setSelectedRound(roundNumber);
              updateCurrentRoundParticipants(roundNumber);
            }}
          >
            <SelectTrigger className="w-[180px]">
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
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Teilnehmer in Runde {selectedRound}:
          </h2>
          <ul className="list-disc pl-5">
            {currentRoundParticipants.map((id, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-400">
                Brawl Stars ID: {id}
              </li>
            ))}
          </ul>
        </div>

        {rounds[selectedRound - 1] && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rounds[selectedRound - 1].map((participant) => {
              const isWinner = tournamentWinnersQuery.data?.some(
                (winner) =>
                  winner.winnerId === participant.id &&
                  winner.roundNumber === selectedRound,
              );
              return (
                <Card
                  key={participant.id}
                  className={`overflow-hidden transition-all duration-200 ${
                    isWinner ? "ring-2 ring-yellow-500" : ""
                  }`}
                >
                  <CardHeader className="py-4 dark:bg-gray-800">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {participant.username}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Brawl Stars ID: {participant.brawlstars_id}
                    </p>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                      Discord ID: {participant.discord_id}
                    </p>
                    <Button
                      variant={isWinner ? "default" : "outline"}
                      className="w-full"
                      onClick={() =>
                        handleWinnerSelection(participant, selectedRound - 1)
                      }
                      disabled={isWinner}
                    >
                      {isWinner ? (
                        <>
                          <Trophy className="mr-2 h-4 w-4" />
                          Gewinner
                        </>
                      ) : (
                        "Als Gewinner markieren"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantBracket;
