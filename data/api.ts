import { FactionInfo } from "@/types/factionInfo";
import {
  ApiCrime,
  Crime,
  FactionDonations,
  FactionVault,
} from "../types/crime";

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
    return data as FactionInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchFactionVault = async (apiKey: string) => {
  try {
    const response = await fetch(
      `https://api.torn.com/faction/?selections=currency&key=${apiKey}`
    );
    const data = (await response.json()) as FactionVault;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type ApiFactionDonations = {
  donations: FactionDonations;
};

export const fetchFactionDonations = async (apiKey: string) => {
  try {
    const response = await fetch(
      `https://api.torn.com/faction/?selections=donations&key=${apiKey}`
    );
    const data = (await response.json()) as ApiFactionDonations;
    return data.donations;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
