import {
  getFactionDonations,
  getFactionVault,
} from "@/app/(authenticated)/crime-stats/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FactionFunds = async () => {
  const factionDonations = await getFactionDonations();
  const factionVault = await getFactionVault();

  if (!factionDonations || !factionVault) {
    return null;
  }

  const totalDonations = Object.values(factionDonations).reduce(
    (acc, currentValue) => {
      return currentValue.money_balance + acc;
    },
    0
  );

  const factionFunds = factionVault.money - totalDonations;
  const factionVaultMoney = factionVault.money;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Faction&apos;s Funds
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
        <div className="flex flex-row gap-6">
          <div>
            <small className="text-xs opacity-70">Total funds</small>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }).format(factionVaultMoney)}
            </div>
          </div>
          <div>
            <small className="text-xs opacity-70">Owned by faction</small>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }).format(factionFunds)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
