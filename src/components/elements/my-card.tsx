import React from "react";
import { IconType } from "react-icons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MyCardProps {
  cardTitle: string;
  cardStat: number;
  lastMonth: string;
  CardIcon: IconType;
}

export const MyCard: React.FC<MyCardProps> = ({
  cardTitle,
  cardStat,
  lastMonth,
  CardIcon,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{cardTitle}</CardTitle>
        <CardIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cardStat}</div>
        <p className="text-xs text-muted-foreground">{lastMonth}</p>
      </CardContent>
    </Card>
  );
};

export default MyCard;
