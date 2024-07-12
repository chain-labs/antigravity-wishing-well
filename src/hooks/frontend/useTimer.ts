"use client";

import { useEffect, useState } from "react";

export type CountdownType = {
  era: "wishwell" | "mining" | "minting";
  phase: 1 | 2 | 3;
  days: number;
  hours: number;
  mins: number;
  secs: number;
  claimStarted: boolean;
};

const DEFAULT: CountdownType = localStorage.getItem("current-timestamp")
  ? JSON.parse(localStorage.getItem("current-timestamp") as string)
  : {
      era: "mining",
      phase: 2,
      days: 0,
      hours: 0,
      mins: 0,
      secs: 0,
      claimStarted: false,
    };

let timer: CountdownType = { ...DEFAULT };

function setTimer(newTimer: CountdownType) {
  timer = newTimer;
}

function getNextEra(currentEra: CountdownType["era"]): CountdownType["era"] {
  switch (currentEra) {
    case "wishwell":
      return "mining";
    case "mining":
      return "minting";
    case "minting":
      return "wishwell";
    default:
      return "mining";
  }
}

function calculateTimeDifference(endTime: string) {
  const endDate = new Date(endTime).getTime();
  if (isNaN(endDate)) return { days: 0, hours: 0, mins: 0, secs: 0 };

  const now = new Date().getTime();
  const diff = endDate - now;

  if (diff < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, mins, secs };
}

function getCurrentEraAndPhase(timestamps: any) {
  const now = new Date().getTime();

  // Check each phase start and end time to determine the current era and phase
  for (let era = 1; era <= 3; era++) {
    for (let phase = 1; phase <= 3; phase++) {
      const startKey = `era_${era}_phase_${phase}_start`;
      const endKey = `era_${era}_phase_${phase}_end`;

      const startTime = new Date(timestamps[startKey]).getTime();
      const endTime = new Date(timestamps[endKey]).getTime();

      if (now >= startTime && now < endTime) {
        return {
          era: `era_${era}` as "era_1" | "era_2" | "era_3",
          phase: phase as 1 | 2 | 3,
        };
      }
    }
  }

  // If no phase is active, default to the first phase of the first era
  return { era: "era_3" as "era_1" | "era_2" | "era_3", phase: 3 };
}

let timestamps: any = null;
function setTimestamps(newTimestamps: any) {
  timestamps = newTimestamps;
}

function createDummyTimestamps() {
  const now = new Date();
  const dummyTimestamps: any = {};

  for (let era = 1; era <= 3; era++) {
    for (let phase = 1; phase <= 3; phase++) {
      const startKey = `era_${era}_phase_${phase}_start`;
      const endKey = `era_${era}_phase_${phase}_end`;

      dummyTimestamps[startKey] = new Date(
        now.getTime() + (era - 1) * 3 * 10 * 1000 + (phase - 1) * 10 * 1000,
      ).toISOString();
      dummyTimestamps[endKey] = new Date(
        now.getTime() + (era - 1) * 3 * 10 * 1000 + phase * 10 * 1000,
      ).toISOString();
    }
  }

  dummyTimestamps["claim_starts"] = new Date(
    now.getTime() + 1000,
  ).toISOString();
  dummyTimestamps["claim_ends"] = new Date(now.getTime() + 5000).toISOString();

  return dummyTimestamps;
}

export default function useTimer() {
  const [currentTimer, setCurrentTimer] = useState<CountdownType>(timer);

  useEffect(() => {
    if (timestamps === null) {
      async function fetchData() {
        const response = await fetch(
          "https://hujrbtk3.api.sanity.io/v2024-07-01/data/query/collective_page?query=*%5B_type%3D%3D%22timestamps%22%5D%5B0%5D",
        );
        const data = await response.json();

        const { era, phase } = getCurrentEraAndPhase(data.result);
        const phaseEndKey = `${era}_phase_${phase}_end`;
        const initialTime = calculateTimeDifference(data.result[phaseEndKey]);
        const initialTimer: CountdownType = {
          era:
            era === "era_1"
              ? "wishwell"
              : era === "era_2"
                ? "mining"
                : ("minting" as "wishwell" | "mining" | "minting"),
          phase: phase as 1 | 2 | 3,
          ...initialTime,
          claimStarted: false,
        };
        setTimer(initialTimer);
        setCurrentTimer(initialTimer);
        setTimestamps(data.result);
        localStorage.setItem("timestamps", JSON.stringify(data.result));
        localStorage.setItem("current-timestamp", JSON.stringify(initialTimer));
      }

      fetchData();
    }

    const interval = setInterval(() => {
      setCurrentTimer((prevTimer) => {
        if (!prevTimer) return prevTimer;
        let { days, hours, mins, secs, phase, era, claimStarted } = prevTimer;

        const now = new Date().getTime();
        const claimStart = new Date(timestamps["claim_starts"]).getTime();
        const claimEnd = new Date(timestamps["claim_ends"]).getTime();

        if (now >= claimStart && now <= claimEnd) {
          const claimTime = calculateTimeDifference(timestamps["claim_ends"]);
          return {
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: true,
          };
        } else {
          claimStarted = false;
        }

        if (secs > 0) {
          secs -= 1;
        } else {
          if (mins > 0) {
            mins -= 1;
            secs = 59;
          } else if (hours > 0) {
            hours -= 1;
            mins = 59;
            secs = 59;
          } else if (days > 0) {
            days -= 1;
            hours = 23;
            mins = 59;
            secs = 59;
          } else {
            // Time's up, move to the next phase or era
            if (phase === 3 && era === "minting") {
              return {
                era: "minting",
                phase: 3,
                days: 0,
                hours: 0,
                mins: 0,
                secs: 0,
                claimStarted: false,
              };
            }
            era = getNextEra(era);
            phase = phase === 3 ? 1 : ((phase + 1) as 1 | 2 | 3);

            const phaseEndKey = `era_${
              era === "wishwell" ? 1 : era === "mining" ? 2 : 3
            }_phase_${phase}_end`;
            const newTime = calculateTimeDifference(timestamps[phaseEndKey]);

            days = newTime.days;
            hours = newTime.hours;
            mins = newTime.mins;
            secs = newTime.secs;
          }
        }

        const newTimer: CountdownType = {
          era,
          phase,
          days,
          hours,
          mins,
          secs,
          claimStarted,
        };

        setTimer(newTimer); // Update the global timer variable
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTimer;
}
