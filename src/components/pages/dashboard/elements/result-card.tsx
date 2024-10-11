import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MatchResult {
  winner: string;
  loser: string;
  score: string;
}

export const RecentResults: React.FC<{ results: MatchResult[] }> = ({
  results,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Results</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {results.map((result, index) => (
          <div className="flex items-center" key={index}>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {result.winner}
              </p>
              <p className="text-sm text-muted-foreground">vs {result.loser}</p>
            </div>
            <div className="ml-auto font-medium">{result.score}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
