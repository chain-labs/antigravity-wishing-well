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
  claimTransition: boolean;
};

const DEFAULT: CountdownType = {
  era: "mining",
  phase: 2,
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
  claimStarted: false,
  claimTransition: false,
  ...(localStorage.getItem("current-timestamp")
    ? JSON.parse(localStorage.getItem("current-timestamp")!)
    : {}),
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

      const startTime = new Date(timestamps?.[startKey]).getTime();
      const endTime = new Date(timestamps?.[endKey]).getTime();

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
  const now = new Date().getTime();
  const timegap = 500000; // 5 seconds
  const dummyTimestamps: any = {
    era_1_phase_1_start: new Date(now).toISOString(),
    era_1_phase_1_end: new Date(now + timegap).toISOString(),
    era_1_phase_2_start: new Date(now + timegap).toISOString(),
    era_1_phase_2_end: new Date(now + timegap * 2).toISOString(),
    era_1_phase_3_start: new Date(now + timegap * 2).toISOString(),
    era_1_phase_3_end: new Date(now + timegap * 3).toISOString(),
    era_2_phase_1_start: new Date(now + timegap * 3).toISOString(),
    era_2_phase_1_end: new Date(now + timegap * 4).toISOString(),
    era_2_phase_2_start: new Date(now + timegap * 4).toISOString(),
    era_2_phase_2_end: new Date(now + timegap * 5).toISOString(),
    era_2_phase_3_start: new Date(now + timegap * 5).toISOString(),
    era_2_phase_3_end: new Date(now + timegap * 6).toISOString(),
    claim_starts: new Date(now + timegap * 7).toISOString(),
    claim_ends: new Date(now + timegap * 8).toISOString(),
    era_3_phase_1_start: new Date(now + timegap * 8).toISOString(),
    era_3_phase_1_end: new Date(now + timegap * 9).toISOString(),
    era_3_phase_2_start: new Date(now + timegap * 9).toISOString(),
    era_3_phase_2_end: new Date(now + timegap * 10).toISOString(),
    era_3_phase_3_start: new Date(now + timegap * 10).toISOString(),
    era_3_phase_3_end: new Date(now + timegap * 11).toISOString(),
  };

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
        // const data = {
        //   result: createDummyTimestamps(),
        // }

        const now = new Date().getTime();
        const era2End = new Date(data.result?.["era_2_phase_3_end"]).getTime();
        const claimStart = new Date(data.result?.["claim_starts"]).getTime();
        const claimEnd = new Date(data.result?.["claim_ends"]).getTime();

        let initialTimer: CountdownType;

        if (now >= era2End && now < claimStart) {
          const claimTime = calculateTimeDifference(
            data.result?.["claim_starts"],
          );
          initialTimer = {
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: false,
            claimTransition: true,
          };
        } else if (now >= claimStart && now <= claimEnd) {
          const claimTime = calculateTimeDifference(
            data.result?.["claim_ends"],
          );
          initialTimer = {
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: true,
            claimTransition: false,
          };
        } else {
          const { era, phase } = getCurrentEraAndPhase(data.result);
          const phaseEndKey = `${era}_phase_${phase}_end`;
          const initialTime = calculateTimeDifference(
            data.result?.[phaseEndKey],
          );

          initialTimer = {
            era:
              era === "era_1"
                ? "wishwell"
                : era === "era_2"
                  ? "mining"
                  : ("minting" as "wishwell" | "mining" | "minting"),
            phase: phase as 1 | 2 | 3,
            ...initialTime,
            claimStarted: false,
            claimTransition: false,
          };
        }

        setTimer(initialTimer);
        setCurrentTimer(initialTimer);
        setTimestamps(data.result);
        localStorage?.setItem("timestamps", JSON.stringify(data.result));
        localStorage?.setItem(
          "current-timestamp",
          JSON.stringify(initialTimer),
        );
      }
      fetchData();
    }

    const interval = setInterval(() => {
      setCurrentTimer((prevTimer) => {
        if (!prevTimer) return prevTimer;

        // let {
        //   days,
        //   hours,
        //   mins,
        //   secs,
        //   phase,
        //   era,
        //   claimStarted,
        //   claimTransition,
        // } = prevTimer;

        const now = new Date().getTime();
        const era2End = new Date(timestamps?.["era_2_phase_3_end"]).getTime();
        const claimStart = new Date(timestamps?.["claim_starts"]).getTime();
        const claimEnd = new Date(timestamps?.["claim_ends"]).getTime();

        if (now >= era2End && now < claimStart) {
          const claimTime = calculateTimeDifference(
            timestamps?.["claim_starts"],
          );
          return {
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: false,
            claimTransition: true,
          };
        } else if (now >= claimStart && now <= claimEnd) {
          const claimTime = calculateTimeDifference(timestamps["claim_ends"]);
          return {
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: true,
            claimTransition: false,
          };
        } else {
          const { era: currentEra, phase: currentPhase } =
            getCurrentEraAndPhase(timestamps);
          const claimTime = calculateTimeDifference(
            timestamps?.[`${currentEra}_phase_${currentPhase}_end`],
          );
          const currentTimer = {
            era:
              currentEra === "era_1"
                ? "wishwell"
                : currentEra === "era_2"
                  ? "mining"
                  : ("minting" as "wishwell" | "mining" | "minting"),
            phase: currentPhase as 1 | 2 | 3,
            ...claimTime,
            claimStarted: false,
            claimTransition: false,
          };
          setTimer(currentTimer);
          return currentTimer;
        }

        // if (secs > 0) {
        //   secs -= 1;
        // } else {
        //   if (mins > 0) {
        //     mins -= 1;
        //     secs = 59;
        //   } else if (hours > 0) {
        //     hours -= 1;
        //     mins = 59;
        //     secs = 59;
        //   } else if (days > 0) {
        //     days -= 1;
        //     hours = 23;
        //     mins = 59;
        //     secs = 59;
        //   } else {
        //     // Time's up, move to the next phase or era if valid
        //     let nextPhase = phase === 3 ? 1 : phase + 1;
        //     let nextEra = getNextEra(era);

        //     const phaseEndKey = `era_${
        //       nextEra === "wishwell" ? 1 : nextEra === "mining" ? 2 : 3
        //     }_phase_${nextPhase}_end`;

        //     // Check if the next phase end time exists and is valid
        //     if (timestamps[phaseEndKey]) {
        //       const phaseEndTime = new Date(timestamps[phaseEndKey]).getTime();
        //       if (now >= phaseEndTime) {
        //         // Move to the next phase or era
        //         era = nextEra;
        //         phase = nextPhase as 1 | 2 | 3;

        //         const newTime = calculateTimeDifference(
        //           timestamps[phaseEndKey],
        //         );

        //         days = newTime.days;
        //         hours = newTime.hours;
        //         mins = newTime.mins;
        //         secs = newTime.secs;
        //       }
        //     } else {
        //       // Move to the next era
        //       era = nextEra;
        //       phase = nextPhase as 1 | 2 | 3;

        //       const newTime = calculateTimeDifference(timestamps[phaseEndKey]);

        //       days = newTime.days;
        //       hours = newTime.hours;
        //       mins = newTime.mins;
        //       secs = newTime.secs;
        //     }
        //   }
        // }

        // const newTimer: CountdownType = {
        //   era,
        //   phase,
        //   days,
        //   hours,
        //   mins,
        //   secs,
        //   claimStarted,
        //   claimTransition,
        // };

        // setTimer(newTimer); // Update the global timer variable
        // return newTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTimer;
}
