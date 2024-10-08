import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface Tournament {
  id: number;
  tournament_name: string;
  start_date: Date;
  game_type: any;
  status: any;
  max_participants: number;
  hosted_by: string;
}

export const OngoingTournaments: React.FC<{ tournaments: Tournament[] }> = ({
  tournaments,
}) => {
  const router = useRouter();
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Ongoing Tournaments</CardTitle>
      </CardHeader>
      <CardContent>
        {tournaments.length === 0 && (
          <p className="text-center text-muted-foreground">
            No ongoing tournaments
          </p>
        )}
        <ScrollArea className="h-[300px]">
          <div className="pr-4">
            {tournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="flex items-center justify-between py-2"
                onClick={() =>
                  router.push(`/dashboard/tournament/${tournament.id}`)
                }
              >
                <div>
                  <p className="font-medium">{tournament.tournament_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tournament.max_participants} Max participants
                  </p>
                </div>
                <div className="font-medium">{tournament.status}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
