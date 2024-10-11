import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Participant } from "@/types/tournament";

interface MatchResult {}

export const RecentResults: React.FC<{ results?: Participant[] }> = ({
  results,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Results</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {results ? (
          <section>
            {results.map((result, index) => (
              <div className="flex items-center" key={index}>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {result.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    vs {result.brawlstars_id}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {result.brawlstars_id}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div>No Recent Results</div>
        )}
      </div>
    </CardContent>
  </Card>
);
