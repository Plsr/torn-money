import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeek } from "date-fns";
import { cn } from "@/lib/utils";
import { Crime } from "../types/crime";

export const CrimesPerformedWidget = ({ crimes }: { crimes: Crime[] }) => {
  const lastWeekCrimeNumber = crimes.filter((crime) => {
    const crimeDate = new Date(crime.time_completed * 1000);
    const weekNumber = getWeek(crimeDate);
    return weekNumber === getWeek(new Date()) - 1;
  }).length;

  const referenceWeekCrimeNumber = crimes.filter((crime) => {
    const crimeDate = new Date(crime.time_completed * 1000);
    const weekNumber = getWeek(crimeDate);
    return weekNumber === getWeek(new Date()) - 2;
  }).length;

  // Calculate the percentage increase
  const percentageIncrease =
    ((lastWeekCrimeNumber - referenceWeekCrimeNumber) /
      referenceWeekCrimeNumber) *
    100;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Crimes performed</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{lastWeekCrimeNumber}</div>
        <p
          className={cn(
            "text-xs text-muted-foreground",
            percentageIncrease > 0 && "text-green-600",
            percentageIncrease < 0 && "text-red-600"
          )}
        >
          {percentageIncrease > 0 ? "+" : "-"}
          {percentageIncrease.toFixed(2)}% from previous week
        </p>
      </CardContent>
    </Card>
  );
};
