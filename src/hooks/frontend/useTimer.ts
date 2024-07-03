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
  era: "wishwell",
  phase: 3,
  days: 0,
  hours: 0,
  mins: 0,
  secs: 10,
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

export default function useTimer() {
  const [currentTimer, setCurrentTimer] = useState<CountdownType>(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimer((prevTimer) => {
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
            if (phase < 3) {
              phase += 1;
            } else {
              phase = 1;
              era = getNextEra(era);
            }

            // Reset timer to default values for the new phase or era
            days = DEFAULT.days;
            hours = DEFAULT.hours;
            mins = DEFAULT.mins;
            secs = DEFAULT.secs;
          }
        }

        const newTimer: CountdownType = {
          era,
          phase: phase as 1 | 2 | 3,
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
  }, []);

  return currentTimer;
}
