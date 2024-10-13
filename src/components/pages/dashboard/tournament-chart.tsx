import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TooltipProps } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { TournamentHook } from "@/components/hooks/tournament-hook";

const chartConfig = {
  participants: {
    label: "Max Participants",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ParticipantChart() {
  const { tournamentQuery } = TournamentHook();
  const totalTournaments = tournamentQuery?.data || [];

  const chartData = totalTournaments.map((tournament) => ({
    name: tournament.tournament_name,
    participants: tournament.max_participants,
    id: tournament.id,
    status: tournament.status,
    startDate: new Date(tournament.start_date).toLocaleDateString(),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tournament Overview</CardTitle>
        <CardDescription>Max Participants per Tournament</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar
              dataKey="participants"
              fill="var(--color-participants)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {totalTournaments.length} Active Tournaments{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing max participants for each tournament
        </div>
      </CardFooter>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded border bg-background p-2 shadow-sm">
        <p className="font-bold">{data.name}</p>
        <p>ID: {data.id}</p>
        <p>Max Participants: {data.participants}</p>
        <p>Status: {data.status}</p>
        <p>Start Date: {data.startDate}</p>
      </div>
    );
  }
  return null;
};

export default ParticipantChart;
