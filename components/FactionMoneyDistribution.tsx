import { getFactionDonations, getFactionVault } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FactionMoneyDistribution = async () => {
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

  const factionVaultMoney = factionVault.money;
  const factionFunds = factionVaultMoney - totalDonations;
  const percentageOwned = ((factionFunds / factionVaultMoney) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Fund distribution</CardTitle>
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
        <div className="flex flex-row ">
          <div
            className="bg-zinc-300 h-9 rounded-l flex items-center justify-center text-xs"
            style={{ width: `${100 - parseInt(percentageOwned)}%` }}
          >
            {100 - parseInt(percentageOwned)}%
          </div>
          <div
            className="bg-zinc-800 h-9 rounded-r text-white flex items-center justify-center text-xs"
            style={{ width: `${percentageOwned}%` }}
          >
            {percentageOwned}%
          </div>
        </div>
        <div className="flex flex-row justify-between text-xs opacity-60 mt-2">
          <p>Owned by Members</p>
          <p>Owned by Faction</p>
        </div>
      </CardContent>
    </Card>
  );
};
