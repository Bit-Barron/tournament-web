import React, { useState, useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { tournamentIdchartConfig } from "@/components/utils/config";

interface TournamentData {
  round: number;
  participants: number;
}

interface TournamentOverviewChartProps {
  tournamentData: TournamentData[];
  maxParticipants: number;
  currentParticipants: number;
}

export function TournamentOverviewChart({
  tournamentData,
  maxParticipants,
  currentParticipants,
}: TournamentOverviewChartProps) {
  const [activeChart] = useState<string>("participants");

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Tournament Overview</CardTitle>
          <CardDescription>Showing participants per round</CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Current Participants
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {currentParticipants} / {maxParticipants}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={tournamentIdchartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={tournamentData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="round"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="participants"
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="participants"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default TournamentOverviewChart;
