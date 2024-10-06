import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
}) => (
  <Card className="col-span-2">
    <CardHeader>
      <CardTitle>Ongoing Tournaments</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {tournaments.map((tournament) => (
          <div className="flex items-center" key={tournament.tournament_name}>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {tournament.tournament_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {tournament.max_participants} participants
              </p>
            </div>
            <div className="ml-auto font-medium">{tournament.status}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
