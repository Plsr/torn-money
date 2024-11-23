export type ApiCrime = {
  crime_id: number;
  crime_name: string;
  participants: {
    [userId: string]: null;
  }[];
  time_started: number;
  time_ready: number;
  time_left: number;
  time_completed: number;
  initiated: number;
  initiated_by: number;
  planned_by: number;
  success: number;
  money_gain: number;
  respect_gain: number;
};

export type Crime = {
  crime_id: number;
  crime_name: string;
  participants: {
    [userId: string]: null;
  }[];
  time_started: number;
  time_ready: number;
  time_left: number;
  time_completed: number;
  initiated: boolean;
  initiated_by: number;
  planned_by: number;
  success: boolean;
  money_gain: number;
  respect_gain: number;
};

export type FactionVault = {
  money: number;
  points: number;
  faction_id: number;
};

export type FactionDonations = {
  [key: string]: {
    name: string;
    money_balance: number;
    points_balance: number;
  };
};
