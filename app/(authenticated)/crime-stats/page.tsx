import { getCrimes } from "./actions";
import { format, getWeek } from "date-fns";

import { MoneyGainedChart } from "@components/MoneyGainedChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { LastWeekRevenueWidget } from "@components/LastWeekRevenueWidget";
import { CrimesPerformedWidget } from "@components/CrimesPerformedWidget";
import { FailureRateWidget } from "@components/FailureRateWidget";
import { FactionFunds } from "@/components/FactionFunds";
import { FactionMoneyDistribution } from "@/components/FactionMoneyDistribution";

export default async function Home() {
  const crimes = await getCrimes();

  if (!crimes) return null;

  const crimesByWeek = crimes
    .filter((crime) => crime.initiated && crime.success)
    .reduce((acc: { [key: string]: number }, crime) => {
      const crimeDate = new Date(crime.time_completed * 1000);
      const weekNumber = getWeek(crimeDate);

      // Format: "Week X - YYYY-MM-DD"
      const weekKey = `Week ${weekNumber}`;

      if (!acc[weekKey]) {
        acc[weekKey] = 0;
      }

      acc[weekKey] += crime.money_gain;
      return acc;
    }, {});

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mt-6">Crime Stats</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-6">
        <FactionFunds />
        <FactionMoneyDistribution />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-6">
        <Card>
          <CardHeader>
            <CardTitle>Money Gained</CardTitle>
          </CardHeader>
          <CardContent>
            <MoneyGainedChart crimesByWeek={crimesByWeek} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Crimes</CardTitle>
          </CardHeader>
          <CardContent className="w-full max-h-[300px] overflow-y-auto">
            <Table>
              <TableCaption>Recent Crimes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...crimes]
                  .sort((a, b) => b.time_completed - a.time_completed)
                  .map((crime) => (
                    <TableRow key={crime.time_started}>
                      <TableCell className="font-medium">
                        {format(
                          new Date(crime.time_started * 1000),
                          "MM/dd/yyyy"
                        )}
                      </TableCell>
                      <TableCell>{crime.crime_name}</TableCell>
                      <TableCell>
                        {crime.success
                          ? "Success"
                          : crime.initiated
                            ? "Failed"
                            : "Pending"}
                      </TableCell>
                      <TableCell className="text-right">
                        ${crime.money_gain}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-6">
        <LastWeekRevenueWidget crimesByWeek={crimesByWeek} />
        <CrimesPerformedWidget crimes={crimes} />
        <FailureRateWidget crimes={crimes} />
      </div>
    </div>
  );
}
