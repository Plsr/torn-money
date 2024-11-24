type TODO = unknown;

type FactionMember = {
  name: string;
  level: number;
  days_in_faction: number;
  last_action: TODO;
  status: TODO;
  position: string;
};

export type FactionInfo = {
  ID: number;
  name: string;
  tag_image: string;
  leader: number;
  "co-leader": number;
  respect: number;
  age: number;
  capacity: number;
  best_chain: number;
  ranked_wars: TODO; // TODO: No idea what could be in here
  territory_wars: TODO; // TODO: No idea what could be in here
  raid_wars: TODO; // TODO: No idea what could be in here
  rank: {
    level: number;
    name: string;
    division: number;
    position: number;
    wins: number;
  };
  members: Record<string, FactionMember>;
  peace: Record<string, number>;
};
