console.log("Hello World");
import fetch from "node-fetch";

import dotenv from "dotenv";
import {
  format,
  isAfter,
  previousFriday,
  startOfDay,
  subWeeks,
} from "date-fns";
dotenv.config();

const API_KEY = process.env.TORN_API_KEY || "";
if (!API_KEY) {
  console.error("Please set TORN_API_KEY environment variable");
  process.exit(1);
}
async function getCrimeInfo() {
  try {
    const response = await fetch(
      `https://api.torn.com/faction/?selections=crimes&key=${API_KEY}`
    );
    const data = await response.json();

    // Filter for successful crimes and group by week
    const crimes = data.crimes || {};
    const successfulCrimes = Object.values(crimes).filter(
      (crime: any) => crime.success === 1 && crime.initiated === 1
    );

    console.log("Successful crimes:", successfulCrimes);

    // Filter for only the last two weeks, starting from Friday
    const successfulCrimesLastTwoWeeks = successfulCrimes.filter(
      (crime: any) => {
        const crimeDate = new Date(crime.time_completed * 1000);
        const today = new Date();

        // Find last Friday
        const lastFriday = startOfDay(previousFriday(today));

        // Find two Fridays ago
        const twoFridaysAgo = subWeeks(lastFriday, 1);

        // Check if crime is after friday two weeks ago
        return isAfter(crimeDate, twoFridaysAgo);
      }
    );

    const crimesByWeek = successfulCrimes.reduce((acc: any, crime: any) => {
      const crimeDate = new Date(crime.time_completed * 1000);
      const weekStart = new Date(crimeDate);
      weekStart.setDate(crimeDate.getDate() - crimeDate.getDay());
      const weekKey = format(weekStart, "yyyy-MM-dd");

      // Initialize with 0 if the week doesn't exist yet
      if (!acc[weekKey]) {
        acc[weekKey] = 0;
      }

      // Directly add the money_gain to the accumulator
      acc[weekKey] += crime.money_gain;

      return acc;
    }, {});

    console.log("Successful crimes by week:", crimesByWeek);

    console.log(
      Object.values(crimesByWeek as Record<string, number>).reduce(
        (sum: number, amount: number) => sum + amount,
        0
      ) / Object.values(crimesByWeek as Record<string, number>).length
    );
  } catch (error) {
    console.error("Error fetching crime info:", error);
  }
}

getCrimeInfo();

async function getFactionInfo() {
  try {
    const response = await fetch(
      `https://api.torn.com/faction/?selections=basic&key=${API_KEY}`
    );
    const data = await response.json();
    console.log("Faction info:", data);
  } catch (error) {
    console.error("Error fetching faction info:", error);
  }
}

// getFactionInfo();
