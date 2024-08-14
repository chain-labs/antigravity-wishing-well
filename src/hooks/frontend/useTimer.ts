"use client";

import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";

export type CountdownType = {
  era: "wishwell" | "mining" | "minting";
  phase: 1 | 2 | 3;
  days: number;
  hours: number;
  mins: number;
  secs: number;
  claimStarted: boolean;
  claimTransition: boolean;
  mintingTransition: boolean;
  isMintingActive: boolean;
  journey: 1 | 2 | 3;
  phaseNumber: 1 | 2 | 3;
  isJourneyPaused: boolean;
  nextJourneyTimeStamp: number;
  currentMintEndTimestamp: number | null | undefined;
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
  mintingTransition: false,
  isMintingActive: false,
  journey: 1,
  phaseNumber: 1,
  isJourneyPaused: true,
  nextJourneyTimeStamp: 0,
  currentMintEndTimestamp: null,
};

let timer: CountdownType = { ...DEFAULT };

function setTimer(newTimer: CountdownType) {
  timer = newTimer;
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
  const timegap = 50000; // 5 seconds
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
    era_3_phase_1_start: new Date(now + timegap * 10).toISOString(),
    era_3_phase_1_end: new Date(now + timegap * 11).toISOString(),
    era_3_phase_2_start: new Date(now + timegap * 11).toISOString(),
    era_3_phase_2_end: new Date(now + timegap * 12).toISOString(),
    era_3_phase_3_start: new Date(now + timegap * 12).toISOString(),
    era_3_phase_3_end: new Date(now + timegap * 13).toISOString(),
  };

  return dummyTimestamps;
}

export default function useTimer() {
  const [currentTimer, setCurrentTimer] = useState<CountdownType>(timer);

  useEffect(() => {}, []);

  useEffect(() => {
    if (timestamps === null) {
      async function fetchData() {
        const timeData = await client.fetch(`*[_type=="timestamps"][0]`);
        // const timeData = createDummyTimestamps();
        // add the minting timestamps here
        const mintingTimestamps = {
          currentJourney: 1,
          currentPhase: 1,
          isJourneyPaused: false,
          nextJourneyTimestamp: new Date().getTime() + 20000000,
          mintEndTimestamp: new Date().getTime() + 10000000,
        };
        const now = new Date().getTime();
        const era2End = new Date(
          timeData?.["era_2_phase_3_end"] || "",
        ).getTime();
        const claimStart = new Date(timeData?.["claim_starts"] || "").getTime();
        const claimEnd = new Date(timeData?.["claim_ends"] || "").getTime();
        const mintStarted = new Date(
          timeData?.["era_3_phase_1_start"] || "",
        ).getTime();

        let initialTimer: CountdownType;

        if (now >= era2End && now < claimStart) {
          const claimTime = calculateTimeDifference(
            timeData?.["claim_starts"] || "",
          );
          initialTimer = {
            ...DEFAULT,
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: false,
            claimTransition: true,
          };
        } else if (now >= claimStart && now <= claimEnd) {
          const claimTime = calculateTimeDifference(
            timeData?.["claim_ends"] || "",
          );
          initialTimer = {
            ...DEFAULT,
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: true,
            claimTransition: false,
          };
        } else if (now >= claimEnd && now <= mintStarted) {
          const mintTime = calculateTimeDifference(
            timeData?.["era_3_phase_1_start"] || "",
          );
          initialTimer = {
            ...DEFAULT,
            era: "mining",
            phase: 3,
            ...mintTime,
            claimStarted: false,
            claimTransition: false,
            mintingTransition: true,
          };
        } else {
          const { era, phase } = getCurrentEraAndPhase(timeData);
          if (era === "era_3") {
            if (mintingTimestamps.isJourneyPaused) {
              initialTimer = {
                era: "minting",
                phase: mintingTimestamps.currentJourney as 1 | 2 | 3,
                days: 0,
                hours: 0,
                mins: 0,
                secs: 0,
                claimStarted: false,
                claimTransition: false,
                mintingTransition: false,
                isMintingActive: true,
                journey: mintingTimestamps.currentJourney as 1 | 2 | 3,
                phaseNumber: mintingTimestamps.currentPhase as 1 | 2 | 3,
                isJourneyPaused: mintingTimestamps.isJourneyPaused,
                nextJourneyTimeStamp: mintingTimestamps.nextJourneyTimestamp,
                currentMintEndTimestamp: mintingTimestamps.mintEndTimestamp,
              };
            } else {
              initialTimer = {
                era: "minting",
                phase: mintingTimestamps.currentJourney as 1 | 2 | 3,
                ...calculateTimeDifference(
                  new Date(mintingTimestamps.mintEndTimestamp).toISOString(),
                ),
                claimStarted: false,
                claimTransition: false,
                mintingTransition: false,
                isMintingActive: true,
                journey: mintingTimestamps.currentJourney as 1 | 2 | 3,
                phaseNumber: mintingTimestamps.currentPhase as 1 | 2 | 3,
                isJourneyPaused: mintingTimestamps.isJourneyPaused,
                nextJourneyTimeStamp: mintingTimestamps.nextJourneyTimestamp,
                currentMintEndTimestamp: mintingTimestamps.mintEndTimestamp,
              };
            }
          } else {
            const phaseEndKey = `${era}_phase_${phase}_end`;
            // @ts-ignore
            const endTime = timeData[phaseEndKey];
            const initialTime = calculateTimeDifference(endTime);

            initialTimer = {
              ...DEFAULT,
              era: era === "era_1" ? "wishwell" : "mining",
              phase: phase as 1 | 2 | 3,
              ...initialTime,
              claimStarted: false,
              claimTransition: false,
            };
          }
        }

        setTimer(initialTimer);
        setCurrentTimer(initialTimer);
        setTimestamps({ timeData, mintingTimestamps });
        localStorage?.setItem("timestamps", JSON.stringify(timeData));
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

        const now = new Date().getTime();
        const era2End = new Date(timestamps?.["era_2_phase_3_end"]).getTime();
        const claimStart = new Date(timestamps?.["claim_starts"]).getTime();
        const claimEnd = new Date(timestamps?.["claim_ends"]).getTime();
        const mintStarted = new Date(
          timestamps?.["era_3_phase_1_start"],
        ).getTime();

        if (now >= era2End && now < claimStart) {
          const claimTime = calculateTimeDifference(
            timestamps?.["claim_starts"],
          );
          return {
            ...DEFAULT,
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: false,
            claimTransition: true,
          };
        } else if (now >= claimStart && now <= claimEnd) {
          const claimTime = calculateTimeDifference(timestamps["claim_ends"]);
          return {
            ...DEFAULT,
            era: "mining",
            phase: 3,
            ...claimTime,
            claimStarted: true,
            claimTransition: false,
          };
        } else if (now >= claimEnd && now <= mintStarted) {
          const mintTime = calculateTimeDifference(
            timestamps["era_3_phase_1_start"],
          );
          return {
            ...DEFAULT,
            era: "mining",
            phase: 3,
            ...mintTime,
            claimStarted: false,
            claimTransition: false,
            mintingTransition: true,
          };
        } else {
          const { era: currentEra, phase: currentPhase } = getCurrentEraAndPhase(timestamps);
          const claimTime = calculateTimeDifference(
            timestamps?.[`${currentEra}_phase_${currentPhase}_end`],
          );
          let currentTimer;
          if (currentEra === "era_3") {
            if (timestamps?.mintingTimestamps.isJourneyPaused) {
              currentTimer = {
                era: "minting",
                phase: timestamps?.mintingTimestamps.currentJourney as
                  | 1
                  | 2
                  | 3,
                days: 0,
                hours: 0,
                mins: 0,
                secs: 0,
                claimStarted: false,
                claimTransition: false,
                mintingTransition: false,
                isMintingActive: true,
                journey: timestamps?.mintingTimestamps.currentJourney as
                  | 1
                  | 2
                  | 3,
                phaseNumber: timestamps?.mintingTimestamps.currentPhase as
                  | 1
                  | 2
                  | 3,
                isJourneyPaused: timestamps?.mintingTimestamps.isJourneyPaused,
                nextJourneyTimeStamp:
                  timestamps?.mintingTimestamps.nextJourneyTimestamp,
                currentMintEndTimestamp:
                  timestamps?.mintingTimestamps.mintEndTimestamp,
              };
            } else {
              currentTimer = {
                era: "minting",
                phase: timestamps?.mintingTimestamps.currentJourney as
                  | 1
                  | 2
                  | 3,
                ...calculateTimeDifference(
                  new Date(
                    timestamps?.mintingTimestamps.mintEndTimestamp,
                  ).toISOString(),
                ),
                claimStarted: false,
                claimTransition: false,
                mintingTransition: false,
                isMintingActive: true,
                journey: timestamps?.mintingTimestamps.currentJourney as
                  | 1
                  | 2
                  | 3,
                phaseNumber: timestamps?.mintingTimestamps.currentPhase as
                  | 1
                  | 2
                  | 3,
                isJourneyPaused: timestamps?.mintingTimestamps.isJourneyPaused,
                nextJourneyTimeStamp:
                  timestamps?.mintingTimestamps.nextJourneyTimestamp,
                currentMintEndTimestamp:
                  timestamps?.mintingTimestamps.mintEndTimestamp,
              };
            }
          } else {
            // @ts-ignore
            currentTimer = {
              ...DEFAULT,
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
          }
          setTimer(currentTimer as CountdownType);
          return currentTimer as CountdownType;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTimer;
}
