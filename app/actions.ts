"use server";

import { fetchFactionInfo, getFactionCrimes } from "../data/api";
import { getApiKey } from "../util/cookies";

export const getFactionInfo = async () => {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("API key is required");
  }
  return fetchFactionInfo(apiKey);
};

// TODO: Find better name
export const getCrimes = async () => {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("API key is required");
  }

  try {
    const crimes = await getFactionCrimes(apiKey);
    console.log(crimes);
    return crimes;
  } catch (error) {
    console.error(error);
  }
};
