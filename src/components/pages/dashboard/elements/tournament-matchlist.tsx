import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TournamentData } from "@/types/tournament";

export const UpcomingMatches: React.FC<{ newMatches?: TournamentData[] }> = ({
  newMatches,
}) => {
  const matches = newMatches?.filter((type) => type.status === "PENDING");
  return (
    <Card className="col-span-2 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Upcoming Matches
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="px-6">
            {matches && matches.length > 0 ? (
              matches.map((match, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-800 py-4 last:border-b-0"
                >
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
                    className="border-gray-700 bg-transparent text-white hover:bg-gray-800"
                  >
                    View
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-4 text-gray-400">No Upcoming Matches</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
