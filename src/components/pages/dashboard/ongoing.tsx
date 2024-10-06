import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Tournament {
  name: string;
  participants: number;
  progress: number;
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
          <div className="flex items-center" key={tournament.name}>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {tournament.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {tournament.participants} participants
              </p>
            </div>
            <div className="ml-auto font-medium">{tournament.progress}%</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
