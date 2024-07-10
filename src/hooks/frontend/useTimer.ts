"use client";

import { useEffect, useState } from "react";

export type CountdownType = {
  era: "wishwell" | "mining" | "minting";
  phase: 1 | 2 | 3;
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

const DEFAULT: CountdownType = {
  era: "mining",
  phase: 2,
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
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
  return { era: "era_1" as "era_1" | "era_2" | "era_3", phase: 1 };
}

let timestamps: any = null;
function setTimestamps(newTimestamps: any) {
  timestamps = newTimestamps;
}

export default function useTimer() {
  const [currentTimer, setCurrentTimer] = useState<CountdownType>(timer);
  const [currentTimeStamps, setCurrentTimeStamps] = useState(timestamps);

  useEffect(() => {
    if (timestamps === null && localStorage.getItem("timestamps") !== null) {
      const data = JSON.parse(localStorage.getItem("timestamps") as string);
      const { era, phase } = getCurrentEraAndPhase(data);
      const phaseStartKey = `${era}_phase_${phase}_end`;
      const initialTime = calculateTimeDifference(data[phaseStartKey]);
      const initialTimer: CountdownType = {
        era:
          era === "era_1"
            ? "wishwell"
            : era === "era_2"
              ? "mining"
              : ("minting" as "wishwell" | "mining" | "minting"),
        phase: phase as 1 | 2 | 3,
        ...initialTime,
      };
      setTimer(initialTimer);
      setCurrentTimer(initialTimer);
      setTimestamps(data);
      setCurrentTimeStamps(data);
    }

    if (timestamps === null && localStorage.getItem("timestamps") === null && currentTimeStamps === null) {
      async function fetchData() {
        const response = await fetch(
          "https://hujrbtk3.api.sanity.io/v2024-07-01/data/query/collective_page?query=*%5B_type%3D%3D%22timestamps%22%5D%5B0%5D",
        );
        const data = await response.json();

        const { era, phase } = getCurrentEraAndPhase(data.result);
        const phaseStartKey = `${era}_phase_${phase}_end`;
        const initialTime = calculateTimeDifference(data.result[phaseStartKey]);
        const initialTimer: CountdownType = {
          era:
            era === "era_1"
              ? "wishwell"
              : era === "era_2"
                ? "mining"
                : ("minting" as "wishwell" | "mining" | "minting"),
          phase: phase as 1 | 2 | 3,
          ...initialTime,
        };
        setTimer(initialTimer);
        setCurrentTimer(initialTimer);
        setTimestamps(data.result);
        setCurrentTimeStamps(data.result);
        localStorage.setItem("timestamps", JSON.stringify(data.result));
      }

      fetchData();
    }

    if (currentTimeStamps === null) return;
    const interval = setInterval(() => {
      setCurrentTimer((prevTimer) => {
        if (!prevTimer) return prevTimer;
        let { days, hours, mins, secs, phase, era } = prevTimer;

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
            era = getNextEra(era);
            phase = phase === 3 ? 1 : ((phase + 1) as 1 | 2 | 3);

            const phaseStartKey = `era_${era === "wishwell" ? 1 : era === "mining" ? 2 : 3}_phase_${phase}_end`;
            const newTime = calculateTimeDifference(timestamps[phaseStartKey]);

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
        };

        setTimer(newTimer); // Update the global timer variable
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTimeStamps]);

  return currentTimer;
}
