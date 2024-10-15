import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TournamentData } from "@/types/tournament";
import { useRouter } from "next/navigation";

export const UpcomingMatches: React.FC<{ newMatches?: TournamentData[] }> = ({
  newMatches,
}) => {
  const matches = newMatches?.filter((type) => type.status === "PENDING");
  const router = useRouter();

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Upcoming Matches
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="px-6">
            {matches && matches.length > 0 ? (
              matches.map((match, index) => {
                return (
                  <section key={index}>
                    <div className="flex items-center justify-between border-gray-800 py-4 last:border-b-0">
                      <div>
                        <p className="text-sm font-medium">
                          {match.tournament_name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(match.start_date)
                            .toLocaleDateString(undefined, {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .replace(/\//g, ".")}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 bg-transparent hover:bg-gray-800"
                        onClick={() =>
                          router.push(
                            `/dashboard/tournament/${match.tournament_id}`,
                          )
                        }
                      >
                        View
                      </Button>
                    </div>
                    <Separator />
                  </section>
                );
              })
            ) : (
              <div className="py-4 text-gray-400">No Upcoming Matches</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
