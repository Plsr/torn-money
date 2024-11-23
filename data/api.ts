import { ApiCrime, Crime } from "../types/crime";

type ApiCrimeResponse = {
  crimes: {
    [key: string]: ApiCrime;
  };
};
export const getFactionCrimes = async (apiKey: string) => {
  try {
    const response = await fetch(
      `https://api.torn.com/faction/?selections=crimes&key=${apiKey}`
    );

    const data: ApiCrimeResponse = await response.json();
    const crimes = Object.values(data.crimes);
    const parsedCrimes = crimes.map((crime) => ({
      ...crime,
      initiated: crime.initiated === 1,
      success: crime.success === 1,
    }));

    return parsedCrimes as Crime[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchFactionInfo = async (apiKey: string) => {
  try {
    const response = await fetch(
      `https://api.torn.com/faction/?selections=basic&key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
