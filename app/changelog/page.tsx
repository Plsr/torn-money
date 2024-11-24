import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Keep track of updates and changes to our project",
};

export type ChangelogEntry = {
  date: string;
  changes: Change[];
};

export type Change = {
  type:
    | "added"
    | "changed"
    | "deprecated"
    | "removed"
    | "fixed"
    | "security"
    | "improved";
  description: string;
};

const changelogData: ChangelogEntry[] = [
  {
    date: "2024-11-24",
    changes: [
      {
        type: "added",
        description: "Basic sidebar",
      },
    ],
  },
  {
    date: "2024-11-23",
    changes: [
      {
        type: "improved",
        description: "Wording in some of the funds cards",
      },
      {
        type: "added",
        description: "Overview of the faction funds and donations",
      },
      {
        type: "added",
        description: "Changelog to keep track of updates and changes",
      },
    ],
  },
  {
    date: "2024-11-17",
    changes: [
      { type: "added", description: "Initial release of the application" },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="space-y-8 p-4 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mt-6">Changelog</h1>
      {changelogData.map((entry) => (
        <div key={entry.date} className="border-b border-gray-200 pb-6">
          <h2 className="text-2xl font-semibold mb-2">
            {format(new Date(entry.date), "MMMM d, yyyy")}
          </h2>
          <ul className="space-y-2">
            {entry.changes.map((change, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <Badge
                  variant="outline"
                  className={getChangeTypeColor(change.type)}
                >
                  {capitalizeFirstLetter(change.type)}
                </Badge>
                <span className="flex-1">{change.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function getChangeTypeColor(type: string): string {
  switch (type) {
    case "added":
      return "bg-green-100 text-green-800 border-green-200";
    case "changed":
    case "improved":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "deprecated":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "removed":
      return "bg-red-100 text-red-800 border-red-200";
    case "fixed":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "security":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
