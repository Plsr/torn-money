"use server";

import {
  fetchFactionDonations,
  fetchFactionInfo,
  fetchFactionVault,
  getFactionCrimes,
} from "../data/api";
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
    return crimes;
  } catch (error) {
    console.error(error);
  }
};

export const getFactionVault = async () => {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("API key is required");
  }
  try {
    const factionVault = await fetchFactionVault(apiKey);
    return factionVault;
  } catch (error) {
    console.error(error);
  }
};

export const getFactionDonations = async () => {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("API key is required");
  }

  try {
    const factionDonations = await fetchFactionDonations(apiKey);
    return factionDonations;
  } catch (error) {
    console.error(error);
  }
};
