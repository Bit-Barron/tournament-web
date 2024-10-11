import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Match {
  team1: string;
  team2: string;
  date: string;
  time: string;
}

export const UpcomingMatches: React.FC<{ matches?: Match[] }> = ({
  matches,
}) => (
  <Card className="col-span-2">
    <CardHeader>
      <CardTitle>Upcoming Matches</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {matches ? (
          <div>
            {matches.map((match, index) => (
              <div className="flex items-center" key={index}>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {match.team1} vs {match.team2}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {match.date} at {match.time}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No Upcoming Matches</div>
        )}
      </div>
    </CardContent>
  </Card>
);
