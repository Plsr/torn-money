import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeek } from "date-fns";
import { cn } from "@/lib/utils";

export const LastWeekRevenueWidget = ({
  crimesByWeek,
}: {
  crimesByWeek: Record<string, number>;
}) => {
  const referenceWeek = crimesByWeek[`Week ${getWeek(new Date()) - 2}`];
  const lastWeek = crimesByWeek[`Week ${getWeek(new Date()) - 1}`];

  // Calculate the percentage increase
  const percentageIncrease = ((lastWeek - referenceWeek) / referenceWeek) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Last week&apos;s revenue
        </CardTitle>
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
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(crimesByWeek[`Week ${getWeek(new Date()) - 1}`])}
        </div>
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
